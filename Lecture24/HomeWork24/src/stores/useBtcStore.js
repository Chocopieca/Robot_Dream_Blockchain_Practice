import {defineStore} from "pinia";
import * as bitcoinjs from "bitcoinjs-lib";
import ECPairFactory from "ecpair";
import {useEtherJsStore} from "./useEtherJsStore";
import * as ecc from 'tiny-secp256k1';

function toDecimals(amount, decimal) {
  return useEtherJsStore().toDecimals(amount, decimal);
}
function fromDecimals(amount, decimal) {
  return useEtherJsStore().fromDecimals(amount, decimal);
}

export const useBtcStore = defineStore("btcToken", {
  state() {
    return {
      isConnected: false,
      keyPair: null,
      p2pkh: null,
      btcAddress: null,
      btcBalance: 0,
      network: null,
    }
  },
  getters: {
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
    async initBtcWallet() {
      this.network = bitcoinjs.networks.testnet;
      const userPrivateKey = import.meta.env.VITE_BTC_PRIVATE_KEY;
      this.keyPair = this.getKeyPair(userPrivateKey);
      this.p2pkh = this.getP2PKH(this.keyPair.publicKey);
      this.btcAddress = this.p2pkh.address;
      await this.getBtcBalance();
      this.isConnected = true;
    },
    async getBtcBalance() {
      const res = await (await fetch(
        `https://api.blockcypher.com/v1/btc/test3/addrs/${this.btcAddress}/balance`
      )).json();
      this.btcBalance = fromDecimals(res.final_balance, 8);
    },
    async sendBtc(payload) {
      const { fee, receiver, amount } = payload;
      const sendAmountValue = +toDecimals(amount, 8);
      const feeAmountValue = +toDecimals(fee, 8);
      const balance = +toDecimals(this.btcBalance, 8);
      const amountLeftValue = balance - sendAmountValue - feeAmountValue;
      const lastTx = await this.getLastTx();
      const txHash = this.getTxHex(lastTx, amountLeftValue, sendAmountValue, receiver);
      return await this.txPush(txHash);
    },
    getKeyPair(privateKey) {
      const ECPair = ECPairFactory(ecc);
      return ECPair.fromPrivateKey(
          Buffer.from(privateKey, "hex"),
          { network: this.network }
      );
    },
    getP2PKH(publicKey) {
      return bitcoinjs.payments.p2pkh({ pubkey: publicKey, network: this.network } )
    },
    async getLastTx() {
      return (await (await fetch(
          "https://api.blockcypher.com/v1/btc/test3/addrs/" + this.btcAddress,
      )).json()).txrefs[1];
    },
    getTxHex(lastTx, amountLeftValue, sendAmountValue, receiver) {
      const txb = new bitcoinjs.TransactionBuilder(this.network);
      txb.addInput(lastTx.tx_hash, lastTx.tx_output_n);
      txb.addOutput(this.btcAddress, amountLeftValue);
      txb.addOutput(receiver, sendAmountValue);
      txb.sign(0, this.keyPair);
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
    }
  }
})
