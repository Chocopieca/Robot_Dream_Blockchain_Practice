import {defineStore} from "pinia";
import {ethers} from "ethers";
import {markRaw} from "@vue/reactivity";

export const useEtherJsStore = defineStore("etherJs", {
  state() {
    return {
      provider: null,
      signer: null,
      userAddress: null,
      userEtherBalance: 0,
    }
  },
  actions: {
    async onConnect() {
      this.provider = markRaw(await new ethers.providers.Web3Provider(window.ethereum));
      await this.provider.send('eth_requestAccounts', []);
      if(this.provider) {
        await this.getUserData();
      }
    },
    async getUserData() {
      this.signer = this.provider.getSigner();
      this.userAddress = await this.signer.getAddress();
      await this.getUserBalance()
    },
    async getUserBalance() {
      const balance = await this.provider.getBalance(
        this.userAddress
      );
      this.userEtherBalance = Number(
        ethers.utils.formatEther(balance)
      ).toFixed(4);
    },
    async onSendEth(payload) {
      const {receiver, amount} = payload;
      const sendAmountValue = ethers.utils.parseUnits(amount, 18);
      const tx = await this.signer.sendTransaction({
        to: receiver,
        value: sendAmountValue
      });
      await tx.wait();
      return tx;
    }
  }
})
