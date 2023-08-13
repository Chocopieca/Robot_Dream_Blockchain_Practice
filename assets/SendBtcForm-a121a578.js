


import{_ as v,s as h,r as l,o as i,b as m,w as u,e as a,z as c,y,f as s,E as k,a as B,t as b,T as g}from"./index-16cfe48a.js";import{u as V}from"./useValidateModule-e4f95304.js";import{u as E}from"./useBtcStore-3235f34f.js";import"./useErc20TokenStore-82c493ef.js";import"./useEtherJsStore-cbfd4020.js";const C=h({name:"SendBtcForm",data(){return{isLoading:!1,transaction:"",form:{fee:"",receiver:"",amount:""},errors:this.validateModule.errorHandlerModule.value}},setup(){const e=E(),r=V();async function t(d){return await e.sendBtc(d)}return{btcToken:e,validateModule:r,sendBtc:t}},methods:{async submitForm(){try{console.log("test");const e={fee:this.form.fee,receiver:this.form.receiver.trim(),amount:this.form.amount};if(!this.validate(e.fee,e.receiver,e.amount))return;this.isLoading=!0,this.transaction=await this.sendBtc(e).then(r=>(alert(r.tx.hash),r.tx.hash)),this.form={receiver:"",amount:""}}catch(e){console.log("SubmitForm error: ",e)}finally{this.isLoading=!1}},validate(e,r,t){return this.validateModule.validateForm([{key:"address",value:r,method:"isNotEmpty"},{key:"amount",value:t,method:"isNotEmpty"},{key:"fee",value:e,method:"isNotEmpty"},{key:"address",value:r,method:"isBtcAddressValid"},{key:"amount",value:t,method:"isValueOverZero"},{key:"fee",value:e,method:"isValueOverZero"},{key:"amount",value:t,method:"isAmountNoOverBtcBalance"}])}},computed:{getBlockcypherLink(){return this.transaction?`https://live.blockcypher.com/btc-testnet/tx/${this.transaction}`:null}}}),L={class:"flex-center mb-5"},N={key:1,class:"etherscan-link"},F=["href"];function $(e,r,t,d,S,M){const f=l("BaseLoading"),n=l("BaseInput"),p=l("BaseButton");return i(),m(g,{mode:"out-in"},{default:u(()=>[a("div",null,[e.isLoading?(i(),m(f,{key:0})):c("",!0),a("form",{class:y(e.transaction?"mb-2":"")},[s(n,{modelValue:e.form.fee,"onUpdate:modelValue":r[0]||(r[0]=o=>e.form.fee=o),label:"Fee",class:"mr-2",type:"number",error:e.errors.getError("fee"),onClearError:r[1]||(r[1]=o=>e.errors.clearError("fee"))},null,8,["modelValue","error"]),a("div",L,[s(n,{modelValue:e.form.receiver,"onUpdate:modelValue":r[2]||(r[2]=o=>e.form.receiver=o),label:"Receiver",class:"mr-2",error:e.errors.getError("address"),onClearError:r[3]||(r[3]=o=>e.errors.clearError("address"))},null,8,["modelValue","error"]),s(n,{modelValue:e.form.amount,"onUpdate:modelValue":r[4]||(r[4]=o=>e.form.amount=o),label:"Amount",class:"ml-2",type:"number",error:e.errors.getError("amount"),onClearError:r[5]||(r[5]=o=>e.errors.clearError("amount"))},null,8,["modelValue","error"])]),s(p,{buttonColor:"#E95420",onClick:e.submitForm},{default:u(()=>[k(" SEND ")]),_:1},8,["onClick"])],2),e.getBlockcypherLink?(i(),B("div",N,[a("a",{href:e.getBlockcypherLink,target:"_blank",class:"main-black-text"}," Blockcypher: "+b(e.transaction),9,F)])):c("",!0)])]),_:1})}const O=v(C,[["render",$],["__scopeId","data-v-8cb24dd5"]]);export{O as default};
