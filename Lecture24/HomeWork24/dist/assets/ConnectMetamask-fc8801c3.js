import{_ as r,k as _,r as o,o as n,b as a,w as s,A as d,T as u}from"./index-dc074c6e.js";import{u as m}from"./useEtherJsStore-a3845144.js";import{u as p}from"./useErc20TokenStore-83bff55f.js";const l=_({name:"ConnectMetamask",data(){return{isLoading:!1}},setup(){const t=p();async function e(){await t.init()}return{initErc20:e}},methods:{async onConnectMetamask(){this.isLoading=!0,await m().onConnect(),await this.loadData(),this.isLoading=!1},async loadData(){await this.initErc20()}}});function k(t,e,f,C,h,B){const c=o("BaseLoading"),i=o("BaseButton");return n(),a(u,{mode:"out-in"},{default:s(()=>[t.isLoading?(n(),a(c,{key:0})):(n(),a(i,{key:1,buttonColor:"#E95420",class:"connect-button",onClick:t.onConnectMetamask},{default:s(()=>[d(" Connect Metamask ")]),_:1},8,["onClick"]))]),_:1})}const L=r(l,[["render",k],["__scopeId","data-v-b328c64a"]]);export{L as default};