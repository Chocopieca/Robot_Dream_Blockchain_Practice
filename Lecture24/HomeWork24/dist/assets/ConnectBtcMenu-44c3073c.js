


import{_ as y,d as s,h as r,r as c,o as t,a as o,g as a,w as i,b as d,B as p,T as _,e as v}from"./index-e395a367.js";const B={name:"ConnectBtcMenu",components:{ConnectBtcWallet:s(()=>r(()=>import("./ConnectBtcWallet-87eaeb1b.js"),["assets/ConnectBtcWallet-87eaeb1b.js","assets/index-e395a367.js","assets/index-17b485b8.css","assets/useBtcStore-11588391.js","assets/useEtherJsStore-7c49bcae.js","assets/useValidateModule-6ec7c30c.js","assets/useErc20TokenStore-0d1ebf78.js","assets/ConnectBtcWallet-ecd099fe.css"])),GenerateBtcAddress:s(()=>r(()=>import("./GenerateBtcAddress-2e0a81cd.js"),["assets/GenerateBtcAddress-2e0a81cd.js","assets/useBtcStore-11588391.js","assets/index-e395a367.js","assets/index-17b485b8.css","assets/useEtherJsStore-7c49bcae.js","assets/useValidateModule-6ec7c30c.js","assets/useErc20TokenStore-0d1ebf78.js","assets/GenerateBtcAddress-2c49f5b7.css"]))},data(){return{connectType:"withPrivateKey"}}},C={class:"size16-weight700 main-orange-text cursor-pointer"};function T(k,n,f,A,e,w){const l=c("ConnectBtcWallet"),m=c("GenerateBtcAddress");return t(),o("div",null,[a(_,{mode:"out-in"},{default:i(()=>[e.connectType==="withPrivateKey"?(t(),d(l,{key:0,class:"mb-5"})):e.connectType==="generateAddress"?(t(),d(m,{key:1,class:"mb-5"})):p("",!0)]),_:1}),v("span",C,[a(_,{mode:"out-in"},{default:i(()=>[e.connectType==="withPrivateKey"?(t(),o("span",{key:0,onClick:n[0]||(n[0]=u=>e.connectType="generateAddress")},"Create address")):e.connectType==="generateAddress"?(t(),o("span",{key:1,onClick:n[1]||(n[1]=u=>e.connectType="withPrivateKey")},"I have private key")):p("",!0)]),_:1})])])}const g=y(B,[["render",T]]);export{g as default};
