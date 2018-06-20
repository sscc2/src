// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router/routerConfig.js'
import axios from 'axios'
import ElementUI from 'element-ui'
import './libs/css/initTag.min.css'
import 'element-ui/lib/theme-chalk/index.css'
import './libs/css/fdep.css'
import Vuex from 'vuex'
import store from './libs/store.js'
//import i18n from './lang'
//import Mock from './mock/initSV.js'
//Mock.init();

Vue.config.productionTip = false;
Vue.use(Vuex);
Vue.use(ElementUI, { size: 'big' });
Vue.prototype.$axios = axios;

/* eslint-disable no-new */
new Vue({
	el: '#app',
	router,
	store,
	//i18n,
	render: h => h(App)
});