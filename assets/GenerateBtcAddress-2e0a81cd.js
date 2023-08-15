


import{u as f}from"./useBtcStore-11588391.js";import{u as b}from"./useValidateModule-6ec7c30c.js";import{_,r as u,o as C,a as B,e as a,g as r,w as p,f as v,p as K,i as h}from"./index-e395a367.js";import"./useEtherJsStore-7c49bcae.js";import"./useErc20TokenStore-0d1ebf78.js";const k={name:"GenerateBtcAddress",data(){return{mnemonic:"",privateKey:"",publicKey:"",errors:this.validateModule.errorHandlerModule.value}},setup(){const t=f(),e=b();function l(){t.getNetwork()}async function i(){return await t.generateMnemonic()}async function o(s){return await t.initBtcWallet(s)}return{useBtc:t,validateModule:e,getNetwork:l,generateMnemonic:i,initBtcWallet:o}},mounted(){this.getNetwork()},methods:{async copyURL(t){try{await navigator.clipboard.writeText(t),alert("Copied")}catch{alert("Cannot copy")}},async onGenerateAddress(){const t=await this.generateMnemonic(),{privateKey:e,publicKey:l,mnemonic:i}=t;this.privateKey=e,this.publicKey=l,this.mnemonic=i},async onConnectAddress(){this.validate(this.privateKey)&&(this.isLoading=!0,await this.initBtcWallet(this.privateKey),this.isLoading=!1)},validate(t){return this.validateModule.validateForm([{key:"privateKey",value:t,method:"isNotEmpty"},{key:"privateKey",value:t,method:"isPrivateKey"}])}}},y=t=>(K("data-v-6637bfff"),t=t(),h(),t),g=y(()=>a("h3",null,"Generate BTC address",-1)),w=y(()=>a("div",{class:"mb-5"},"Generate a BTC address for your wallet, then connect it.",-1)),V={class:"flex-center"},x={class:"flex-center"},E={class:"flex-center"};function N(t,e,l,i,o,s){const c=u("BaseInput"),d=u("BaseIcon"),m=u("BaseButton");return C(),B("form",null,[g,w,a("div",V,[r(c,{modelValue:o.mnemonic,"onUpdate:modelValue":e[0]||(e[0]=n=>o.mnemonic=n),label:"Mnemonic",animateTitle:!1,class:"mr-5",disabled:""},null,8,["modelValue"]),r(d,{iconName:"content-copy.svg",onClick:e[1]||(e[1]=n=>s.copyURL(o.mnemonic)),iconColor:{color:"#E95420",hover:"#ff4300"}})]),a("div",x,[r(c,{modelValue:o.privateKey,"onUpdate:modelValue":e[2]||(e[2]=n=>o.privateKey=n),label:"Private key",animateTitle:!1,class:"mr-5",disabled:"",error:o.errors.getError("privateKey"),onClearError:e[3]||(e[3]=n=>o.errors.clearError("privateKey"))},null,8,["modelValue","error"]),r(d,{iconName:"content-copy.svg",onClick:e[4]||(e[4]=n=>s.copyURL(o.privateKey)),iconColor:{color:"#E95420",hover:"#ff4300"}})]),a("div",E,[r(c,{modelValue:o.publicKey,"onUpdate:modelValue":e[5]||(e[5]=n=>o.publicKey=n),label:"Public key",animateTitle:!1,class:"mb-5 mr-5",disabled:""},null,8,["modelValue"]),r(d,{iconName:"content-copy.svg",onClick:e[6]||(e[6]=n=>s.copyURL(o.publicKey)),iconColor:{color:"#E95420",hover:"#ff4300"}})]),r(m,{buttonColor:"#E95420",class:"connect-button mb-5",onClick:s.onGenerateAddress},{default:p(()=>[v(" Generate address ")]),_:1},8,["onClick"]),r(m,{buttonColor:"#E95420",class:"connect-button mb-5",onClick:s.onConnectAddress},{default:p(()=>[v(" Connect address ")]),_:1},8,["onClick"])])}const U=_(k,[["render",N],["__scopeId","data-v-6637bfff"]]);export{U as default};
