import {defineStore} from "pinia";
import * as bitcoinjs from "bitcoinjs-lib";
import ECPairFactory from "ecpair";
import {useEtherJsStore} from "./useEtherJsStore";
import * as ecc from 'tiny-secp256k1';
import * as bip39 from 'bip39';

function toDecimals(amount, decimal) {
  return useEtherJsStore().toDecimals(amount, decimal);
}
function fromDecimals(amount, decimal) {
  return useEtherJsStore().fromDecimals(amount, decimal);
}

export const useBtcStore = defineStore("btcToken", {
  state() {
    return {
      selectedIndex: 0,
      walletId: 0,
      wallets: [
        {
          isConnected: false,
          keyPair: null,
          p2pkh: null,
          btcAddress: null,
          btcBalance: 0,
          network: null,
        }
      ],
    }
  },
  getters: {
    getCurrentWalletId: state => state.walletId,
    getSelectedIndex: state => state.selectedIndex,
    getCurrentWallet: state => state.wallets[state.selectedIndex],
  },
  actions: {
    // async initBtcWalletCDN() {
    //   this.network = bitcoinjs.networks.testnet;
    //   const userPrivateKey = import.meta.env.VITE_BTC_PRIVATE_KEY;
    //   this.keyPair = bitcoinjs.ECPair.fromPrivateKey(
    //     bitcoinjs.Buffer.from(userPrivateKey, "hex"),
    //     { network: this.network }
    //     );
    //   this.p2pkh = bitcoinjs.payments.p2pkh({ pubkey: this.keyPair.publicKey, network: this.network} );
    //   this.btcAddress = this.p2pkh.address;
    //   await this.getBtcBalance();
    //   this.isConnected = true;
    // },
    async initBtcWallet(userPrivateKey) {
      this.getNetwork();
      this.wallets[this.selectedIndex].keyPair = this.getKeyPair(userPrivateKey);
      this.wallets[this.selectedIndex].p2pkh = this.getP2PKH(this.getCurrentWallet.keyPair.publicKey);
      this.wallets[this.selectedIndex].btcAddress = this.getCurrentWallet.p2pkh.address;
      await this.getBtcBalance();
      this.wallets[this.selectedIndex].isConnected = true;
    },
    async generateMnemonic() {
      const path = "m/49'/1'/0'/0/0";
      const mnemonic = bip39.generateMnemonic(256);
      const seed = await bip39.mnemonicToSeed(mnemonic);
      const root = await bitcoinjs.bip32.fromSeed(seed, this.getCurrentWallet.network);
      const child = root.derivePath(path);
      const privateKey = child.privateKey.toString("hex");
      const publicKey = child.publicKey.toString("hex");
      return {
        mnemonic,
        privateKey,
        publicKey,
      }
    },
    async getBtcBalance() {
      const res = await (await fetch(
        `https://api.blockcypher.com/v1/btc/test3/addrs/${this.getCurrentWallet.btcAddress}/balance`
      )).json();
      this.wallets[this.selectedIndex].btcBalance = res.final_balance === 0
          ? 0
          : fromDecimals(res.final_balance, 8);
    },
    getNetwork(network = "testnet") {
      this.wallets[this.selectedIndex].network = bitcoinjs.networks[network];
    },
    async sendBtc(payload) {
      const { fee, receiver, amount } = payload;
      const sendAmountValue = +toDecimals(amount, 8);
      const feeAmountValue = +toDecimals(fee, 8);
      const balance = +toDecimals(this.getCurrentWallet.btcBalance, 8);
      const amountLeftValue = balance - sendAmountValue - feeAmountValue;
      const lastTx = await this.getLastTx();
      const txHash = this.getTxHex(lastTx, amountLeftValue, sendAmountValue, receiver);
      return await this.txPush(txHash);
    },
    getKeyPair(privateKey) {
      const ECPair = ECPairFactory(ecc);
      return ECPair.fromPrivateKey(
          Buffer.from(privateKey, "hex"),
          { network: this.getCurrentWallet.network }
      );
    },
    getP2PKH(publicKey) {
      return bitcoinjs.payments.p2pkh({ pubkey: publicKey, network: this.getCurrentWallet.network } )
    },
    async getLastTx() {
      const addressInfo = (await (await fetch(
        "https://api.blockcypher.com/v1/btc/test3/addrs/" + this.getCurrentWallet.btcAddress,
      )).json());
      const getLastTx = addressInfo.txrefs.length > 1 ? 1 : 0;
      console.log("getLastTx", getLastTx);
      return addressInfo.txrefs[getLastTx];
    },
    getTxHex(lastTx, amountLeftValue, sendAmountValue, receiver) {
      const txb = new bitcoinjs.TransactionBuilder(this.getCurrentWallet.network);
      txb.addInput(lastTx.tx_hash, lastTx.tx_output_n);
      txb.addOutput(receiver, sendAmountValue);
      txb.addOutput(this.getCurrentWallet.btcAddress, amountLeftValue);
      txb.sign(0, this.getCurrentWallet.keyPair);
      return txb.build().toHex();
    },
    async txPush(txHash) {
      try {
        return await (await fetch(
          "https://api.blockcypher.com/v1/btc/test3/txs/push",
          {
            method: "POST",
            body: JSON.stringify({
              tx: txHash,
            })
          }
        )).json();
      } catch (e) {
        console.log("sendBtc error: ", e);
      }
    },
    updateSelectedIndex(index) {
      this.selectedIndex = index;
    },
    createWallet() {
      ++this.walletId;
      this.wallets.push({
        isConnected: false,
        keyPair: null,
        p2pkh: null,
        btcAddress: null,
        btcBalance: 0,
        network: null,
      })
    },
    deleteWallet() {
      if (this.wallets.length > 1) {
        this.wallets.splice(this.selectedIndex, 1);
      }
    }
  }
})
