


import{_ as r,u as d,o as l,a as s,g as o,w as u,t as i,B as n,T as p,E as m,G as b,e as f,H as y,x as V}from"./index-e395a367.js";const g=d({name:"BaseInput",props:{modelValue:{type:[String,Number],default:null},label:{type:String,default:""},type:{type:String,default:"text"},required:{type:Boolean,default:!1},disabled:{type:Boolean,default:!1},width:{type:String,default:"100%"},error:{type:String,default:null},animateTitle:{type:Boolean,default:!0}},data(){return{labelIsVisible:!1}},mounted(){this.animateTitle||(this.labelIsVisible=!0)},methods:{updateTitleStatus(e){this.animateTitle&&(this.labelIsVisible=e)}},computed:{internalValue:{get(){return this.modelValue},set(e){this.$emit("update:modelValue",e)}}}}),B={key:0,class:"base-input-label-tip"},h=["type","disabled","placeholder","required"],v={key:0,class:"main-red-text size10-weight400"};function w(e,t,S,$,I,T){return l(),s("div",{style:V({"max-width":e.width,paddingTop:e.label?"20px":"0"}),class:"base-input w-100"},[o(p,null,{default:u(()=>[e.label&&e.labelIsVisible?(l(),s("span",B,i(e.label),1)):n("",!0)]),_:1}),m(f("input",{"onUpdate:modelValue":t[0]||(t[0]=a=>e.internalValue=a),type:e.type,disabled:e.disabled,placeholder:e.label,required:e.required,onKeydown:t[1]||(t[1]=y(a=>e.$emit("enter",a),["enter"])),onInput:t[2]||(t[2]=a=>e.$emit("clearError")),onFocus:t[3]||(t[3]=a=>e.updateTitleStatus(!0)),onBlur:t[4]||(t[4]=a=>e.updateTitleStatus(!1))},null,40,h),[[b,e.internalValue]]),e.error?(l(),s("div",v,i(e.error),1)):n("",!0)],4)}const q=r(g,[["render",w],["__scopeId","data-v-064bcd39"]]);export{q as default};
