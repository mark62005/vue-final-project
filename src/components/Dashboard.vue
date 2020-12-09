<template>
  <div>
    <Navbar />
    <div class="container-fluid">
      <div class="row">
        <Sidebar />
        <main role="main" class="col-md-9 ml-sm-auto col-lg-10 px-4">
          <router-view></router-view>
        </main>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from './Navbar';
import Sidebar from './Sidebar';

export default {
  components: {
    Navbar,
    Sidebar,
  },
  // CORS method 2
  created() {
    // 取得 Login.vue set 好的 前端 cookie                     Login.vue 的 tokenName
    const myCookie = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/, '$1');
    // console.log('myCookie', myCookie);
    //   axios 設定 requestHeader 的方法
    this.$http.defaults.headers.common.Authorization = myCookie;
  },
};
</script>
