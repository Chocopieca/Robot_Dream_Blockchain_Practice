import{i as r,k as c,_ as a,o as i,a as l,e as _,n as u}from"./index-72ac4e57.js";const o=r({name:"BaseIcon",props:{iconName:{type:String,default:"close-circle.svg"},iconColor:{type:Object,default:{color:"black",hover:"#292929"}},height:{type:String,default:"20px"},width:{type:String,default:"20px"}},computed:{iconPath(){return`url(../src/assets/icon/${this.iconName})`},getIconColor(){return this.iconColor.color},getIconHover(){return this.iconColor.hover},getHeight(){return this.height},getWidth(){return this.width}}}),n=()=>{c(e=>({"34255e20":e.getHeight,"00045e46":e.getWidth,"30e5b3fe":e.getIconColor,"3058804c":e.getIconHover}))},s=o.setup;o.setup=s?(e,t)=>(n(),s(e,t)):n;const d=o;const p={class:"icon dynamic-color"};function h(e,t,g,f,m,b){return i(),l("div",p,[_("i",{style:u({"-webkit-mask-image":e.iconPath,"mask-image":e.iconPath,"background-color":e.iconColor[0]})},null,4)])}const y=a(d,[["render",h],["__scopeId","data-v-6fb260eb"]]);export{y as default};
