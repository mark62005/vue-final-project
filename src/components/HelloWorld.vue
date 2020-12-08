<template>
  <div class="hello">
    <button @click.prevent="signOut">登出</button>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data() {
    return {};
  },
  methods: {
    signOut() {
      const api = `${process.env.API_PATH}/logout`;
      this.axios.post(api).then((res) => {
        console.log(res.data);
        if (res.data.success) this.$router.push({ name: 'login' });
      });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
