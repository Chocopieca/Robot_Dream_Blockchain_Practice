import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import initBaseScripts from "./plugins/InitBaseScripts";
import initRegisterLayouts from "./plugins/RegisterLayouts";

const app = createApp(App)

app.use(router)
app.use(initBaseScripts)
app.use(initRegisterLayouts)

app.mount('#app')
