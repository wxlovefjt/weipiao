import Vue from 'vue'
import App from './App.vue'
import router from './routers'
import store from './stores'

//引入axios
import axios from 'axios'
Vue.prototype.axios=axios;

Vue.filter('setWH',(url , arg) => {
  return url.replace(/w\.h/,arg);
})

//注册全局组件scroller
import Scroller from '@/components/Scroller'
Vue.component('Scroller',Scroller);
import Loading from '@/components/Loading'
Vue.component('Loading',Loading)

//引入 elementui-ui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

//引入 Mint-ui
import Mint from 'mint-ui';
import 'mint-ui/lib/style.css'
Vue.use(Mint);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
