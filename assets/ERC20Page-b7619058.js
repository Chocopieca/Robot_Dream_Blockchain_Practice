import{_ as i,r as a,o as p,a as u,b as s,w as d,e as t,t as m,h as f,p as B,g as b}from"./index-0b5ef6b6.js";const h={name:"ERC20Page",computed:{getAddress(){let e="0x5aCD656a61d4b2AAB249C3Fe3129E3867ab99283";return`${e.slice(0,10)}...${e.slice(-10)}`}}},o=e=>(B("data-v-a5e6bb0e"),e=e(),b(),e),v={class:"h-100 flex-center"},C=o(()=>t("h1",{class:"ma-0"},"ERC20",-1)),g=o(()=>t("div",null,"Balance: 0 MKK",-1)),x=o(()=>t("div",null,"Address:",-1)),E={class:"address"},A={class:"flex-center mb-5"};function I(e,y,D,R,S,_){const c=a("BaseDivider"),n=a("BaseInput"),l=a("BaseButton"),r=a("BaseCard");return p(),u("div",v,[s(r,{width:"500",bgColor:"#ffffff"},{default:d(()=>[C,g,s(c,{class:"my-2",color:"#000000"}),x,t("div",E,m(_.getAddress),1),s(c,{class:"my-2",color:"#000000"}),t("form",null,[t("div",A,[s(n,{label:"Receiver",class:"mr-2"}),s(n,{label:"Amount",class:"ml-2"})]),s(l,{buttonColor:"#E95420"},{default:d(()=>[f(" SEND ")]),_:1})])]),_:1})])}const w=i(h,[["render",I],["__scopeId","data-v-a5e6bb0e"]]);export{w as default};
