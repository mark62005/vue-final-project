<template>
  <div>
    <div class="text-right mt-4">
      <button class="btn btn-primary">建立新的產品</button>
      <table class="table mt-4">
        <thead>
          <tr>
            <th width="120">分類</th>
            <th>產品名稱</th>
            <th width="120">原價</th>
            <th width="120">售價</th>
            <th width="100">是否啟用</th>
            <th width="80">編輯</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="product in products" :key="product.id">
            <td>{{ product.category }}</td>
            <td>{{ product.title }}</td>
            <td class="text-right">
              {{ product.origin_price }}
            </td>
            <td class="text-right">
              {{ product.price }}
            </td>
            <td>
              <span v-if="product.is_enabled" class="text-success">啟用</span>
              <span v-else>未啟用</span>
            </td>
            <td>
              <button class="btn btn-outline-primary btn-sm">編輯</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      products: undefined,
    };
  },
  methods: {
  },
  async created() {
    const api = `${process.env.API_PATH}/api/${process.env.CUSTOM_PATH}/products`;
    this.axios.get(api).then((res) => {
      this.products = res.data.products;
    });
  },
};
</script>
