


import{_ as i,c as d,m as u,d as c,r as _,o as h,a as b,g as p,h as r}from"./index-78953ea0.js";import{u as T}from"./useBtcStore-e1b77f76.js";import"./useEtherJsStore-d9b6d297.js";const m={name:"BtcPage",setup(){const e=T(),a=d(()=>e.getCurrentWalletId),s=d(()=>e.getSelectedIndex);function o(){e.createWallet()}function n(){e.deleteWallet()}function t(l){e.updateSelectedIndex(l)}return{btcStore:e,getCurrentWalletId:a,selectedIndex:s,createWallet:o,deleteWallet:n,updateSelectedIndex:t}},data(){return{tabCount:1,list:u([{id:0,title:"My wallet",component:c(()=>r(()=>import("./BtcCard-8b0353cf.js"),["assets/BtcCard-8b0353cf.js","assets/index-78953ea0.js","assets/index-17b485b8.css","assets/useBtcStore-e1b77f76.js","assets/useEtherJsStore-d9b6d297.js","assets/BtcCard-6b6722cc.css"])),data:{}}])}},methods:{onChangeTab(e){this.updateSelectedIndex(e)},onCreateNewTab(){this.createWallet(),this.tabCount+=1,this.updateSelectedIndex(this.tabCount-1);const e=`My wallet ${this.getCurrentWalletId}`;this.list.push({id:this.getCurrentWalletId,title:e,component:c(()=>r(()=>import("./BtcCard-8b0353cf.js"),["assets/BtcCard-8b0353cf.js","assets/index-78953ea0.js","assets/index-17b485b8.css","assets/useBtcStore-e1b77f76.js","assets/useEtherJsStore-d9b6d297.js","assets/BtcCard-6b6722cc.css"])),data:{}}),this.$refs.tabModule.changeTab({index:null,title:e})},onDeleteTab(){const e=this.selectedIndex===0?this.selectedIndex+1:this.selectedIndex-1,a=this.list[e].title;this.$refs.tabModule.changeTab({index:null,title:a}),this.deleteWallet(),this.list.splice(this.selectedIndex,1),this.updateSelectedIndex(e),this.tabCount-=1}}},x={class:"btc-card h-100 flex-center"};function C(e,a,s,o,n,t){const l=_("BaseTabs");return h(),b("div",x,[p(l,{tabs:n.list,"tab-length-prop":{current:n.tabCount,max:4},withAddTab:"",ref:"tabModule",onOnChangeTab:t.onChangeTab,onOnCreateTab:t.onCreateNewTab,onOnDeleteTab:t.onDeleteTab},null,8,["tabs","tab-length-prop","onOnChangeTab","onOnCreateTab","onOnDeleteTab"])])}const W=i(m,[["render",C],["__scopeId","data-v-dd14a9a3"]]);export{W as default};
