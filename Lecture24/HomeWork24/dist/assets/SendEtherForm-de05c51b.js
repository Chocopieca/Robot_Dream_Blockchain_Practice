import{_ as f,i as _,u as g,r as o,o as s,y as m,w as c,e as a,m as u,b as r,h as E,a as v,t as k,T as B}from"./index-4c22a893.js";const y=_({name:"SendEtherForm",data(){return{isLoading:!1,transaction:"",form:{receiver:"",amount:""}}},setup(){const e=g();async function t(l){return await e.onSendEth(l)}async function i(){return await e.getUserData()}return{useEtherJs:e,onSendEth:t,getUserData:i}},methods:{async submitForm(){const e={receiver:this.form.receiver,amount:this.form.amount};this.isLoading=!0,this.transaction=await this.onSendEth(e),await this.getUserData(),this.form={receiver:"",amount:""},alert(this.transition.hash),this.isLoading=!1}},computed:{getEtherscanLink(){return this.transaction?`https://sepolia.etherscan.io/tx/${this.transaction.hash}`:null}}}),V={class:"mb-2"},b={class:"flex-center mb-5"},L={key:1,class:"etherscan-link"},S=["href"];function C(e,t,i,l,w,D){const h=o("BaseLoading"),d=o("BaseInput"),p=o("BaseButton");return s(),m(B,{mode:"out-in"},{default:c(()=>[a("div",null,[e.isLoading?(s(),m(h,{key:0})):u("",!0),a("form",V,[a("div",b,[r(d,{modelValue:e.form.receiver,"onUpdate:modelValue":t[0]||(t[0]=n=>e.form.receiver=n),label:"Receiver",class:"mr-2"},null,8,["modelValue"]),r(d,{modelValue:e.form.amount,"onUpdate:modelValue":t[1]||(t[1]=n=>e.form.amount=n),label:"Amount",class:"ml-2"},null,8,["modelValue"])]),r(p,{buttonColor:"#E95420",onClick:e.submitForm},{default:c(()=>[E(" SEND ")]),_:1},8,["onClick"])]),e.getEtherscanLink?(s(),v("div",L,[a("a",{href:e.getEtherscanLink,target:"_blank"}," Etherscan: "+k(e.transaction.hash),9,S)])):u("",!0)])]),_:1})}const N=f(y,[["render",C],["__scopeId","data-v-4625d139"]]);export{N as default};