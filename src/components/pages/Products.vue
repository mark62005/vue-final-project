<template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <div class="text-right mt-4">
      <button class="btn btn-primary"
        data-toggle="modal" data-target="#productModal"
        @click="openModal(true)"
      >
        建立新的產品
      </button>
      <!-- table -->
      <table class="table mt-4">
        <thead>
          <tr>
            <th width="120" class="text-left">分類</th>
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
                {{ product.origin_price | currency }}
            </td>
            <td class="text-right">
                {{ product.price | currency }}
            </td>
            <td>
              <span v-if="product.is_enabled" class="text-success">啟用</span>
              <span v-else>未啟用</span>
            </td>
            <td>
              <button class="btn btn-outline-primary btn-sm"
                @click="openModal(false,product.id)"
              >編輯</button>
              <button class="btn btn-outline-primary btn-sm"
                @click="deleteProduct(product.id)"
              >刪除</button>
            </td>
          </tr>
        </tbody>
      </table>
      <!-- pagination -->
      <Pagination :pagination="pagination" @change-page="getProducts" />
      <!-- Modal -->
      <div class="modal fade" id="productModal" tabindex="-1"
        role="dialog" aria-labelledby="productModalLabel" aria-hidden="true"
      >
        <div class="modal-dialog modal-lg text-left" role="document">
          <div class="modal-content border-0">
            <div class="modal-header bg-dark text-white">
              <h5 class="modal-title" id="productModalLabel">新增產品</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span class="text-white" aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <div class="row">
                <div class="col-sm-4">
                  <div class="form-group">
                    <label for="image">輸入圖片網址</label>
                    <input type="text" class="form-control" id="image"
                      v-model.trim="tempProduct.imageUrl"
                      placeholder="請輸入圖片連結"
                    />
                  </div>
                  <div class="form-group">
                    <label for="customFile">或 上傳圖片
                      <i class="fas fa-spinner fa-spin" v-if="status.fileUploading"></i>
                    </label>
                    <input type="file" id="customFile" class="form-control"
                      ref="files" @change="uploadImage"
                    />
                  </div>
                  <img img="https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=828346ed697837ce808cae68d3ddc3cf&auto=format&fit=crop&w=1350&q=80"
                    class="img-fluid" :src="tempProduct.imageUrl" :alt="tempProduct.title"
                  />
                </div>
                <div class="col-sm-8">
                  <div class="form-group">
                    <label for="title">標題</label>
                    <input type="text" class="form-control" id="title"
                      v-model.trim="tempProduct.title"
                      placeholder="請輸入標題" required
                    />
                  </div>

                  <div class="form-row">
                    <div class="form-group col-md-6">
                      <label for="category">分類</label>
                      <input type="text" class="form-control" id="category"
                        v-model.trim="tempProduct.category"
                        placeholder="請輸入分類" required
                      />
                    </div>
                    <div class="form-group col-md-6">
                      <label for="price">單位</label>
                      <input type="unit" class="form-control" id="unit"
                        v-model.trim="tempProduct.unit"
                        placeholder="請輸入單位" required
                      />
                    </div>
                  </div>

                  <div class="form-row">
                    <div class="form-group col-md-6">
                    <label for="origin_price">原價</label>
                      <input type="number" class="form-control" id="origin_price"
                        v-model.number="tempProduct.origin_price"
                        placeholder="請輸入原價" required
                      />
                    </div>
                    <div class="form-group col-md-6">
                      <label for="price">售價</label>
                      <input type="number" class="form-control" id="price"
                        v-model.number="tempProduct.price"
                        placeholder="請輸入售價" required
                      />
                    </div>
                  </div>
                  <hr>

                  <div class="form-group">
                    <label for="description">產品描述</label>
                    <textarea type="text" class="form-control" id="description"
                      v-model.trim="tempProduct.description"
                      placeholder="請輸入產品描述"
                    ></textarea>
                  </div>
                  <div class="form-group">
                    <label for="content">說明內容</label>
                    <textarea type="text" class="form-control" id="content"
                      v-model.trim="tempProduct.content"
                      placeholder="請輸入產品說明內容"
                    ></textarea>
                  </div>
                  <div class="form-group">
                    <div class="form-check">
                      <input class="form-check-input" type="checkbox" id="is_enabled"
                        v-model="tempProduct.is_enabled"
                        :true-value="1"
                        :false-value="0"
                      />
                      <label class="form-check-label" for="is_enabled">
                        是否啟用
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-outline-secondary"
                data-dismiss="modal"
              >取消
              </button>
              <button type="button" class="btn btn-primary"
                @click="updateProduct"
              >確認
              </button>
            </div>
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
  data() {
    return {
      products: [],
      tempProduct: {},
      isNew: false,
      isLoading: false,
      status: {
        uploadingFile: false,
      },
      pagination: {},
    };
  },
  components: {
    Pagination,
  },
  computed: {
  },
  methods: {
    getProducts(page = 1) {
      const api = `${process.env.API_PATH}/api/${process.env.CUSTOM_PATH}/products?page=${page}`;
      this.isLoading = true;
      this.$http.get(api).then((res) => {
        this.products = res.data.products;
        this.pagination = res.data.pagination;
        this.isLoading = false;
      });
    },
    openModal(isNew, id) {
      const index = this.products.findIndex(item => item.id === id);
      const target = this.products[index];
      if (isNew) {
        this.tempProduct = {};
        this.isNew = true;
      } else {
        this.tempProduct = Object.assign({}, target);
        this.isNew = false;
      }
      $('#productModal').modal('show');
    },
    updateProduct() {
      let api = `${process.env.API_PATH}/api/${process.env.CUSTOM_PATH}/admin/product`;
      let httpMethod = 'post';
      if (!this.isNew) {
        api = `${process.env.API_PATH}/api/${process.env.CUSTOM_PATH}/admin/product/${this.tempProduct.id}`;
        httpMethod = 'put';
      }
      if (!this.tempProduct) return;
      this.$http[httpMethod](api, { data: this.tempProduct }).then((res) => {
        $('#productModal').modal('hide');
        this.getProducts();
        if (res.data.success) this.$bus.$emit('message:push', res.data.message, 'success');
        else this.$bus.$emit('message:push', res.data.message, 'danger');
      });
    },
    deleteProduct(id) {
      // const index = this.products.findIndex(item=>item.id == id)
      // let target = this.products[index]
      const api = `${process.env.API_PATH}/api/${process.env.CUSTOM_PATH}/admin/product/${id}`;
      this.$http.delete(api).then((res) => {
        console.log(res.data.message);
        this.getProducts();
      });
    },
    uploadImage() {
      // console.log(this.$refs);
      const uploadedImage = this.$refs.files.files[0];
      const formData = new FormData();
      formData.append('file-to-upload', uploadedImage);
      const url = `${process.env.API_PATH}/api/${process.env.CUSTOM_PATH}/admin/upload`;
      this.$http.post(url, formData, {
        header: {
          'Content-Type': 'multipart/form-data',
        },
      }).then((res) => {
        if (res.data.success) {
          // this.tempProduct.imageUrl = res.data.imageUrl;
          this.$set(this.tempProduct, 'imageUrl', res.data.imageUrl);
        } else this.$bus.$emit('message:push', res.data.message, 'danger');
      });
    },
  },
  async created() {
    this.getProducts();
  },
};
</script>
