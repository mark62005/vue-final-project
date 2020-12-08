<template>
  <div id="app">
    <img src="./assets/logo.png" />
    <router-view />
    <button type="button" class="btn btn-primary">Primary</button>
    <button type="button" class="btn btn-secondary">Secondary</button>
    <button type="button" class="btn btn-success">Success</button>
    <button type="button" class="btn btn-danger">Danger</button>
    <button type="button" class="btn btn-warning">Warning</button>
    <button type="button" class="btn btn-info">Info</button>
    <button type="button" class="btn btn-light">Light</button>
    <button type="button" class="btn btn-dark">Dark</button>

    <button type="button" class="btn btn-link">Link</button>
  </div>
</template>

<script>
export default {
  name: 'App',
  async created() {
    const api = `${process.env.API_PATH}/api/${process.env.CUSTOM_PATH}/products`;
    console.log(process.env.API_PATH, process.env.CUSTOM_PATH);
    this.axios.get(api).then((res) => {
      console.log(res.data);
    });
  },
};
</script>

<style lang="scss">
// // import BS4 globally
// @import "~bootstrap/scss/bootstrap";
@import "./assets/all";
</style>
