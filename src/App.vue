<template>
  <div id="app">
    <!-- <img src="./assets/logo.png" /> -->
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
  async created() {
    const api = `${process.env.API_PATH}/api/${process.env.CUSTOM_PATH}/products`;
    // console.log(process.env.API_PATH, process.env.CUSTOM_PATH);
    this.axios.get(api).then(() => {
      // console.log(res.data);
      console.log('GET DATA SUCCESS');
    }).catch(res => this.$bus.$emit('message:push', res.data.message, 'danger'));
  },
};
</script>

<style lang="scss">
// // import BS4 globally
// @import "~bootstrap/scss/bootstrap";
@import "./assets/all";
</style>
