import{u as h}from"./useErc20TokenStore-83bff55f.js";import{u as v,y as p}from"./useEtherJsStore-a3845144.js";import{B as o}from"./index-dc074c6e.js";class A{errors={};setError(t,s){this.errors[t]||(this.errors[t]=s)}getError(t){return this.errors[t]??null}clearErrors(){this.errors={}}clearError(t){delete this.errors[t]}}function C(){const n=h(),t=v(),s=o(new A),u=o(n.getCurrentBalance),a=o(t.userEtherBalance);function l(r){return typeof r=="number"&&+r==0}function i(r,e){return!l(e)&&!e?(s.value.setError(r,`${r[0].toUpperCase()}${r.slice(1)} is required.`),!1):!0}function c(r,e){return p(e)?!0:(s.value.setError(r,"Address not valid."),!1)}function f(r,e){return e<=0?(s.value.setError(r,"Amount must be more than 0."),!1):!0}function d(r,e){return e>+u.value?(s.value.setError(r,"Amount over your balance."),!1):!0}function m(r,e){return e>+a.value?(s.value.setError(r,"Amount over your balance."),!1):!0}function E(r){return!r.map(e=>this[e.method](e.key,e.value)).includes(!1)}return{isAmountNoOverERC20Balance:d,isAmountNoOverEtherBalance:m,isAmountOverZero:f,isAddressValid:c,isNotEmpty:i,validateForm:E,errorHandlerModule:s}}export{C as u};