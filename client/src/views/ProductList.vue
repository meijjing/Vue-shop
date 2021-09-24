<template>
  <main class="section-productList">
    <div class="inner">
    <img src="../assets/homeBg.jpg" alt="" class="homeBg" />

      <div class="container pb-5">

        <div class="row mb-2">
          <div class="col-12">
            <select class="form-select">
              <option selected>Open this select menu</option>
              <option value="1">노트북</option>
              <option value="2">모니터</option>
              <option value="3">마우스/키보드</option>
            </select>
          </div>
        </div>

        <div class="row g-3">
          <div class="col-xl-3 col-lg-4 col-md-6" :key=index v-for="(product,index) in productList">
            <div class="card">

              <a @click="goToDetail(product.id)">
                <img v-if="product.path!=null" :src="`/download/${product.id}/${product.path}`" alt="" class="d-block w-100" />
              </a>

              <div class="card-body">
                <h6 class="mb-2">{{product.product_name}}</h6>
                <p class="card-text">
                  <span class="badge bg-dark text-white me-1 p-2">{{product.category1}}</span>
                  <span class="badge bg-dark text-white me-1 p-2">{{product.category2}}</span>
                  <span class="badge bg-dark text-white p-2">{{product.category3}}</span>
                </p>

                <div class="text-dark pPrice">
                  <strong>{{product.product_price.toLocaleString()}}</strong> 원
                </div>

                <div class="d-flex justify-content-center align-items-center">
                    <button type="button" class="btn btn-sm btn-outline-secondary">장바구니 담기</button>
                    <button type="button" class="btn btn-sm btn-outline-secondary">주문하기</button>
                </div>

              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  </main>
</template>
<script>
export default {
  name: '',
  components: {},
  data() {
  return {
      productList: []
    };
  },
  created() {
    this.getProductList();
  },
  methods: {
    async getProductList() {
      this.productList = await this.$api("/api/productList", {});
      console.log(this.productList);
    },
    goToDetail(product_id) {
      console.log(product_id);
      this.$router.push({path:'/detail',query:{product_id:product_id}})
    }
  }
}
</script>

<style>
.section-productList .homeBg {
  width:100%;
  z-index: -1;
  margin-bottom: -200px;
  mask-image: linear-gradient(to bottom, rgba(0,0,0,1), rgba(0,0,0,0));
}

.section-productList .form-select {
  position: relative;
}

.section-productList .inner {
  background: rgb(62, 24, 105);
}

.section-productList .card-body h5 {
  height: 80px;
}

.section-productList .card-text {
  margin: 0;
}

.section-productList .pPrice {
  margin: 10px 0;
  font-size: 1.25rem;
  font-weight: 400;
}

.section-productList button {
  width: 120px;
  background: #ffb24d;
  color: #000;
  margin: 0 1px;
  border: none;
}

.section-productList button:hover {
  background: #eb8500;
  color: #fff
}
</style>
