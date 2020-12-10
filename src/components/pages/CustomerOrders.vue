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
            <button type="button" class="btn btn-outline-secondary btn-sm"
              @click="getProduct(product.id)">
              <i class="fas fa-spinner fa-spin" v-if="status.loadingItem === product.id"></i>
              查看更多
            </button>
            <button type="button" class="btn btn-outline-danger btn-sm ml-auto">
              <i class="fas fa-spinner fa-spin" v-if="status.loadingItem === product.id"></i>
              加到購物車
            </button>
          </div>
        </div>
      </div>
    </div>
    <Pagination :pagination="pagination" @change-page="getProducts" />
    <!-- modal -->
    <div class="modal fade" id="productModal" tabindex="-1" role="dialog"
      aria-labelledby="productModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="productModalLabel">
              {{ product.title }}
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <img :src="product.image" class="img-fluid" alt="product.title">
            <blockquote class="blockquote mt-3">
              <p class="mb-0">{{ product.content }}</p>
              <footer class="blockquote-footer text-right">
                {{ product.description }}
              </footer>
            </blockquote>
            <div class="d-flex justify-content-between align-items-baseline">
              <div class="h4" v-if="!product.price">
                {{ product.origin_price }} 元
              </div>
              <del class="h6" v-if="product.price">
                原價 {{ product.origin_price }} 元
              </del>
              <div class="h4" v-if="product.price">
                現在只要 {{ product.price }} 元
              </div>
            </div>
            <select class="form-control mt-3" v-model="product.num">
              <option value="" disabled>-- 請選擇數量 --</option>
              <option v-for="num in 10" :key="num" :value="num">
                選購 {{ num }} {{ product.unit }}
              </option>
            </select>
          </div>
          <div class="modal-footer">
            <div class="text-muted text-nowrap mr-3">
              小計 <strong>{{ totalPrice }}</strong> 元
            </div>
            <button type="button" class="btn btn-primary">
              <i class="fas fa-spinner fa-spin" v-if="status.loadingItem === product.id"></i>
              加到購物車
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery';
import Pagination from '../Pagination';

export default {
  name: 'CustomerOrder',
  data() {
    return {
      products: undefined,
      product: {},
      pagination: {},
      status: {
        loadingItem: '',
      },
      isLoading: false,
    };
  },
  components: {
    Pagination,
  },
  computed: {
    totalPrice() {
      return this.product.num * this.product.price || 0;
    },
  },
  methods: {
    getProducts(page = 1) {
      const api = `${process.env.API_PATH}/api/${process.env.CUSTOM_PATH}/products?page=${page}`;
      this.isLoading = true;
      this.$http.get(api).then((res) => {
        if (res.data.success) {
          this.products = res.data.products;
          this.pagination = res.data.pagination;
        } else this.$bus.$emit('message:push', res.data.message, 'success');
      });
      this.isLoading = false;
    },
    getProduct(id) {
      const api = `${process.env.API_PATH}/api/${process.env.CUSTOM_PATH}/product/${id}`;
      this.status.loadingItem = id;
      this.$http.get(api).then((res) => {
        if (res.data.success) {
          this.product = res.data.product;
          $('#productModal').modal('show');
        } else this.$bus.$emit('messgae:push', res.data.message, 'danger');
        this.status.loadingItem = '';
      });
    },
  },
  created() {
    this.getProducts();
  },
};
</script>
