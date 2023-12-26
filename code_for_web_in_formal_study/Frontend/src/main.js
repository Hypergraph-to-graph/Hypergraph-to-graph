import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus';
import Vuex from 'vuex';
import store from '@/store/index.js'
import 'element-plus/theme-chalk/index.css';
import locale from 'element-plus/lib/locale/lang/zh-cn'
import 'default-passive-events' 

createApp(App).use(scroll).use(Vuex).use(store).use(ElementPlus, { locale }).mount("#app");