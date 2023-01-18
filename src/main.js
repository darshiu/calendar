import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'

import '@/assets/style/element-theme/theme/index.css'
import '@/assets/style/main/index.less'

Vue.config.productionTip = false

Vue.use(ElementUI, {
  size: 'small'
})

new Vue({
  render: h => h(App),
}).$mount('#app')
