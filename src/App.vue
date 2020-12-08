<template>
  <div id="app">
    <img src="./assets/logo.png">
    <router-view/>
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

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
