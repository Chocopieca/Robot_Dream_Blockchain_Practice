import {defineStore} from "pinia";
import * as bitcoinjs from "bitcoinjs-lib";
import ECPairFactory from "ecpair";
import {useEtherJsStore} from "./useEtherJsStore";
import * as ecc from 'tiny-secp256k1';

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
    }
  },
  getters: {
  },
  actions: {
    async initBtcWalletCDN() {
      console.log('bitcoinjs', bitcoinjs);
      const network = bitcoinjs.networks.testnet;
      const userPrivateKey = import.meta.env.VITE_BTC_PRIVATE_KEY;
      this.keyPair = bitcoinjs.ECPair.fromPrivateKey(
        bitcoinjs.Buffer.from(userPrivateKey, "hex"),
        { network }
        );
      this.p2pkh = bitcoinjs.payments.p2pkh({ pubkey: this.keyPair.publicKey, network} );
      this.btcAddress = this.p2pkh.address;
      await this.getBtcBalance();
      this.isConnected = true;
    },
    async initBtcWallet() {
      const network = bitcoinjs.networks.testnet;
      const userPrivateKey = import.meta.env.VITE_BTC_PRIVATE_KEY;
      const ECPair = ECPairFactory(ecc);
      this.keyPair = ECPair.fromPrivateKey(
        Buffer.from(userPrivateKey, "hex"),
        { network }
        );
      this.p2pkh = bitcoinjs.payments.p2pkh({ pubkey: this.keyPair.publicKey, network} );
      this.btcAddress = this.p2pkh.address;
      await this.getBtcBalance();
      this.isConnected = true;
    },
    async getBtcBalance() {
      const res = await (await fetch(
        `https://api.blockcypher.com/v1/btc/test3/addrs/${this.btcAddress}/balance`
      )).json();
      this.btcBalance = fromDecimals(res.final_balance, 8);
    }
  }
})
