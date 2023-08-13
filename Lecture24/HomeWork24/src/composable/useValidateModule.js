import {ethers} from "ethers";
import * as bitcoinjs from "bitcoinjs-lib";
import {ref} from "vue";
import {useErc20TokenStore} from "@/stores/useErc20TokenStore";
import ErrorHandler from "@/entities/ErrorHandler";
import {useEtherJsStore} from "@/stores/useEtherJsStore";
import {useBtcStore} from "@/stores/useBtcStore";

export default function useValidateModule() {
  const erc20Token = useErc20TokenStore();
  const btcToken = useBtcStore();
  const etherJs = useEtherJsStore();
  const errorHandlerModule = ref(new ErrorHandler());

  const erc20balance = ref(erc20Token.getCurrentBalance);
  const ethBalance = ref(etherJs.userEtherBalance);
  const btcBalance = ref(btcToken.btcBalance);
  const network = ref(btcToken.network);

  function isValueZero(val) {
    return typeof val === "number" && +val === 0
  }

  function isNotEmpty(key, val) {
    if (!isValueZero(val) && !val) {
      errorHandlerModule.value.setError(key,
        `${key[0].toUpperCase()}${key.slice(1)} is required.`
      );
      return false;
    } else {
      return true;
    }
  }
  function isEthAddressValid(key, address) {
    if (!ethers.utils.isAddress(address)) {
      errorHandlerModule.value.setError(key,
        "Address not valid."
      );
      return false;
    } else {
      return true;
    }
  }
  function isBtcAddressValid(key, address) {
    if (!bitcoinjs.address.toOutputScript(address, network.value)) {
      errorHandlerModule.value.setError(key,
        "Address not valid."
      );
      return false;
    } else {
      return true;
    }
  }
  function isValueOverZero(key, amount) {
    if (amount <= 0) {
      errorHandlerModule.value.setError(key,
        "Amount must be more than 0."
      );
      return false;
    } else {
      return true;
    }
  }
  function isAmountNoOverERC20Balance(key, amount) {
    if (amount > +erc20balance.value) {
      errorHandlerModule.value.setError(key,
        "Amount over your balance."
      );
      return false;
    } else {
      return true;
    }
  }
  function isAmountNoOverEtherBalance(key, amount) {
    if (amount > +ethBalance.value) {
      errorHandlerModule.value.setError(key,
        "Amount over your balance."
      );
      return false;
    } else {
      return true;
    }
  }
  function isAmountNoOverBtcBalance(key, amount) {
    if (amount > +btcBalance.value) {
      errorHandlerModule.value.setError(key,
        "Amount over your balance."
      );
      return false;
    } else {
      return true;
    }
  }

  // arr example {key: "address", value: form.address, method: "isNotEmpty}
  function validateForm(arr) {
    return !arr.map(item => {
      return this[item.method](item.key, item.value)
    }).includes(false);
  }

  return {
    isAmountNoOverERC20Balance, isAmountNoOverEtherBalance, isValueOverZero, isEthAddressValid, isNotEmpty,
    isAmountNoOverBtcBalance, isBtcAddressValid,
    validateForm, errorHandlerModule
  }
}
