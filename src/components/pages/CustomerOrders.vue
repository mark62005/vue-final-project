<template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <div class="row mt-4">
      <div class="col-md-4 mb-4" v-for="product in products" :key="product.id">
        <div class="card border-0 shadow-sm">
          <div style="height: 150px; background-size: cover; background-position: center"
            :style="{ 'background-image': `url(${product.imageUrl})` }">
          </div>
          <div class="card-body">
            <span class="badge badge-secondary float-right ml-2">
              {{ product.category }}
            </span>
            <h5 class="card-title">
              <a href="#" class="text-dark">
                {{ product.title }}
              </a>
            </h5>
            <p class="card-text">
              {{ product.content }}
            </p>
            <div class="d-flex justify-content-between align-items-baseline">
              <div class="h5" v-if="!product.price">
                {{ product.origin_price | currency  }} 元
              </div>
              <del class="h6">
                原價 {{ product.origin_price | currency  }} 元
              </del>
              <div class="h5">
                現在只要 {{ product.price | currency  }} 元
              </div>
            </div>
          </div>
          <div class="card-footer d-flex">
            <button type="button" class="btn btn-outline-secondary btn-sm">
              <i class="fas fa-spinner fa-spin" v-if="isLoading"></i>
              查看更多
            </button>
            <button type="button" class="btn btn-outline-danger btn-sm ml-auto">
              <i class="fas fa-spinner fa-spin" v-if="isLoading"></i>
              加到購物車
            </button>
          </div>
        </div>
      </div>
    </div>
    <Pagination :pagination="pagination" @change-page="getProducts" />
  </div>
</template>

<script>
import Pagination from '../Pagination';

export default {
  name: 'CustomerOrder',
  data() {
    return {
      products: undefined,
      pagination: {},
      isLoading: false,
    };
  },
  components: {
    Pagination,
  },
  methods: {
    getProducts(page = 1) {
      this.isLoading = true;
      const api = `${process.env.API_PATH}/api/${process.env.CUSTOM_PATH}/products?page=${page}`;
      this.$http.get(api).then((res) => {
        if (res.data.success) {
          this.products = res.data.products;
          this.pagination = res.data.pagination;
        } else this.$bus.$emit('message:push', res.data.message, 'success');
      });
      this.isLoading = false;
    },
  },
  created() {
    this.getProducts();
  },
};
</script>
