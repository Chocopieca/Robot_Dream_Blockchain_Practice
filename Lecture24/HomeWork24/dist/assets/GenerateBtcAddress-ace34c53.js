


import{u as f}from"./useBtcStore-adc449cd.js";import{u as _}from"./useValidateModule-937a4ba0.js";import{_ as b,r as u,o as C,a as B,e as a,g as s,w as p,f as y,p as K,i as k}from"./index-705cd1f6.js";import"./useEtherJsStore-54a3242e.js";import"./useErc20TokenStore-3b5215c5.js";const h={name:"GenerateBtcAddress",data(){return{mnemonic:"",privateKey:"",publicKey:"",errors:this.validateModule.errorHandlerModule.value}},setup(){const t=f(),e=_();function l(){t.getNetwork()}async function i(){return await t.generateMnemonic()}async function o(r){return await t.initBtcWallet(r)}return{useBtc:t,validateModule:e,getNetwork:l,generateMnemonic:i,initBtcWallet:o}},mounted(){this.getNetwork()},methods:{async copyURL(t){try{await navigator.clipboard.writeText(t),alert("Copied")}catch{alert("Cannot copy")}},async onGenerateAddress(){const t=await this.generateMnemonic(),{privateKey:e,publicKey:l,mnemonic:i}=t;this.privateKey=e,this.publicKey=l,this.mnemonic=i},async onConnectAddress(){this.validate(this.privateKey)&&(this.isLoading=!0,await this.initBtcWallet(this.privateKey),this.isLoading=!1)},validate(t){return this.validateModule.validateForm([{key:"privateKey",value:t,method:"isNotEmpty"},{key:"privateKey",value:t,method:"isPrivateKey"}])}}},v=t=>(K("data-v-f10995e3"),t=t(),k(),t),w=v(()=>a("h3",null,"Generate BTC address",-1)),V=v(()=>a("div",{class:"mb-5"},"Generate a BTC address for your wallet, then connect it.",-1)),g={class:"mb-5"},x={class:"flex-center"},M={class:"flex-center"},G={class:"flex-center"};function I(t,e,l,i,o,r){const c=u("BaseInput"),d=u("CopyIcon"),m=u("BaseButton");return C(),B("form",null,[w,V,a("div",g,[a("div",x,[s(c,{modelValue:o.mnemonic,"onUpdate:modelValue":e[0]||(e[0]=n=>o.mnemonic=n),label:"Mnemonic",animateTitle:!1,class:"mr-5",disabled:""},null,8,["modelValue"]),s(d,{class:"cursor-pointer",onClick:e[1]||(e[1]=n=>r.copyURL(o.mnemonic))})]),a("div",M,[s(c,{modelValue:o.privateKey,"onUpdate:modelValue":e[2]||(e[2]=n=>o.privateKey=n),label:"Private key",animateTitle:!1,class:"mr-5",disabled:"",error:o.errors.getError("privateKey"),onClearError:e[3]||(e[3]=n=>o.errors.clearError("privateKey"))},null,8,["modelValue","error"]),s(d,{class:"cursor-pointer",onClick:e[4]||(e[4]=n=>r.copyURL(o.privateKey))})]),a("div",G,[s(c,{modelValue:o.publicKey,"onUpdate:modelValue":e[5]||(e[5]=n=>o.publicKey=n),label:"Public key",animateTitle:!1,class:"mr-5",disabled:""},null,8,["modelValue"]),s(d,{class:"cursor-pointer",onClick:e[6]||(e[6]=n=>r.copyURL(o.publicKey))})])]),s(m,{buttonColor:"#E95420",class:"connect-button mb-5",onClick:r.onGenerateAddress},{default:p(()=>[y(" Generate address ")]),_:1},8,["onClick"]),s(m,{buttonColor:"#E95420",class:"connect-button mb-5",onClick:r.onConnectAddress},{default:p(()=>[y(" Connect address ")]),_:1},8,["onClick"])])}const L=b(h,[["render",I],["__scopeId","data-v-f10995e3"]]);export{L as default};