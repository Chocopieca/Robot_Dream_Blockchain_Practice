


import{K as s,J as P}from"./index-259e7a3e.js";import{u as k,a as C,n as w,E as O,e as V}from"./useBtcStore-9fe5ce5a.js";import{u as g}from"./useErc20TokenStore-e30307ed.js";import{u as K,A as N}from"./useEtherJsStore-b11e1f23.js";class S{errors={};setError(t,n){this.errors[t]||(this.errors[t]=n)}getError(t){return this.errors[t]??null}clearErrors(){this.errors={}}clearError(t){delete this.errors[t]}}function Z(){const u=g(),t=k(),n=K(),o=s(new S),a=s(u.getCurrentBalance),l=s(n.userEtherBalance),i=s(t.btcBalance),c=s(t.getCurrentWallet.network);function f(r){return typeof r=="number"&&+r==0}function d(r,e){return!f(e)&&!e?(o.value.setError(r,`${r[0].toUpperCase()}${r.slice(1)} is required.`),!1):!0}function v(r,e){return N(e)?!0:(o.value.setError(r,"Address not valid."),!1)}function E(r,e){return C.toOutputScript(e,c.value)?!0:(o.value.setError(r,"Address not valid."),!1)}function m(r,e){return e<=0?(o.value.setError(r,"Amount must be more than 0."),!1):!0}function h(r,e){return e>+a.value?(o.value.setError(r,"Amount over your balance."),!1):!0}function p(r,e){return e>+l.value?(o.value.setError(r,"Amount over your balance."),!1):!0}function A(r,e){return e>+i.value?(o.value.setError(r,"Amount over your balance."),!1):!0}function B(r,e){return y(e)?!0:(o.value.setError(r,"Incorrect private key."),!1)}function y(r){try{const e=w.testnet,T=O(V).fromPrivateKey(P.Buffer.from(r,"hex"),{network:e});return!0}catch(e){return console.log("err",e),!1}}function b(r){return!r.map(e=>this[e.method](e.key,e.value)).includes(!1)}return{isAmountNoOverERC20Balance:h,isAmountNoOverEtherBalance:p,isValueOverZero:m,isEthAddressValid:v,isNotEmpty:d,isAmountNoOverBtcBalance:A,isBtcAddressValid:E,isPrivateKey:B,validateForm:b,errorHandlerModule:o}}export{Z as u};
