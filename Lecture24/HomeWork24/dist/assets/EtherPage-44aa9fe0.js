import{_ as h,d as f,u as m,c,r as o,o as E,a as v,b as s,w as B,e as t,t as n,f as A,p as g,g as S}from"./index-12d66c63.js";const x={name:"EtherPage",components:{SendEtherForm:f(()=>A(()=>import("./SendEtherForm-97e59c50.js"),["assets/SendEtherForm-97e59c50.js","assets/index-12d66c63.js","assets/index-3ea17f0f.css","assets/SendEtherForm-b759231e.css"]))},setup(){const e=m(),r=c(()=>e.userAddress),a=c(()=>e.userEtherBalance);return{useEtherJs:e,userAddress:r,userEtherBalance:a}},computed:{getAddress(){return this.userAddress?`${this.userAddress.slice(0,10)}...${this.userAddress.slice(-10)}`:"---"}}},_=e=>(g("data-v-0f47b3fa"),e=e(),S(),e),y={class:"h-100 flex-center"},C=_(()=>t("h1",{class:"ma-0"},"ETH",-1)),b=_(()=>t("div",null,"Address:",-1)),I={class:"address"};function P(e,r,a,i,w,l){const d=o("BaseDivider"),p=o("SendEtherForm"),u=o("BaseCard");return E(),v("div",y,[s(u,{width:"500",bgColor:"#ffffff"},{default:B(()=>[C,t("div",null,"Balance: "+n(i.userEtherBalance)+" ETH",1),s(d,{class:"my-2",color:"#000000"}),b,t("div",I,n(l.getAddress),1),s(d,{class:"my-2",color:"#000000"}),s(p)]),_:1})])}const $=h(x,[["render",P],["__scopeId","data-v-0f47b3fa"]]);export{$ as default};