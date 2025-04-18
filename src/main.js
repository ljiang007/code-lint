import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import FcDesigner from '@form-create/designer';
//渲染器全局组件
Vue.component('ComponentRenderer', require('@/components/ComponentRenderer.vue').default)
//预览全局组件
Vue.component('ComponentPreview', require('@/components/ComponentPreview.vue').default)

Vue.config.productionTip = false
Vue.use(ElementUI);

// 使用 form-create 和 designer
Vue.use(FcDesigner);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
