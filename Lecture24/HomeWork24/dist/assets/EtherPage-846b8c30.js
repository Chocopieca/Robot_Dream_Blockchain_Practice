


import{_ as C,d as i,c as a,r as o,o as r,a as g,b as l,w as A,e as s,f as p,t as h,g as n,h as m,p as x,i as k}from"./index-705cd1f6.js";import{u as y}from"./useEtherJsStore-54a3242e.js";const S={name:"EtherPage",components:{SendEtherForm:i(()=>m(()=>import("./SendEtherForm-d40daf0b.js"),["assets/SendEtherForm-d40daf0b.js","assets/index-705cd1f6.js","assets/index-17b485b8.css","assets/useEtherJsStore-54a3242e.js","assets/useValidateModule-937a4ba0.js","assets/useBtcStore-adc449cd.js","assets/useErc20TokenStore-3b5215c5.js","assets/SendEtherForm-c5c8ca1a.css"])),ConnectMetamask:i(()=>m(()=>import("./ConnectMetamask-8f1360a5.js"),["assets/ConnectMetamask-8f1360a5.js","assets/index-705cd1f6.js","assets/index-17b485b8.css","assets/useEtherJsStore-54a3242e.js","assets/useErc20TokenStore-3b5215c5.js","assets/ConnectMetamask-4c952359.css"]))},setup(){const e=y(),c=a(()=>e.userAddress),d=a(()=>e.userEtherBalance),t=a(()=>e.isConnected);return{useEtherJs:e,userAddress:c,userEtherBalance:d,isConnected:t}},computed:{getAddress(){return this.userAddress?`${this.userAddress.slice(0,10)}...${this.userAddress.slice(-10)}`:"---"}}},u=e=>(x("data-v-3a7023b0"),e=e(),k(),e),b={class:"h-100 flex-center"},I=u(()=>s("h1",{class:"ma-0 main-bright-red-text"},"ETH",-1)),P={class:"size20-weight700 main-red-text"},w=u(()=>s("div",null,"Address:",-1)),D={class:"address"};function T(e,c,d,t,V,E){const f=o("ConnectMetamask"),_=o("BaseDivider"),v=o("SendEtherForm"),B=o("BaseCard");return r(),g("div",b,[t.isConnected?(r(),l(B,{key:1,width:"500",bgColor:"#ffffff"},{default:A(()=>[I,s("div",null,[p("Balance: "),s("span",P,h(t.userEtherBalance),1),p(" ETH")]),n(_,{class:"my-2",color:"#000000"}),w,s("div",D,h(E.getAddress),1),n(_,{class:"my-2",color:"#000000"}),n(v)]),_:1})):(r(),l(f,{key:0}))])}const N=C(S,[["render",T],["__scopeId","data-v-3a7023b0"]]);export{N as default};