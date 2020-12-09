import Vue from 'vue';

// 直接將 component: AlertMessage 掛在 Vue 上
Vue.prototype.$bus = new Vue();

// Message
// this.$bus.$emit('message:push', message, status)
// message: String -> 訊息內容
// status: String -> Alert 的樣式
