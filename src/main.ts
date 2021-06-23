import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import vant, { Lazyload } from 'vant'
import 'vant/lib/index.css'

const app = createApp(App)

app.use(store).use(router).use(vant).use(Lazyload)
app.mount('#app')
