import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import * as anticon from '@ant-design/icons-vue'
import antd from 'ant-design-vue'
import './styles/antd.less'

const app = createApp(App)

for (let [key, value] of Object.entries(anticon)) {
  app.component(key, value)
}
app.config.globalProperties.$anticon = anticon

app.use(store).use(router).use(antd)
app.mount('#app')
