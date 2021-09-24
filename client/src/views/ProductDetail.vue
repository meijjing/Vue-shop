<template>
  <main class="mt-3 section-productDetail">
    <div class="container">

      <div class="row inner">

        <!-- 제품 이미지 -->
        <div class="col-md-5">
          <div id="carouselExampleIndicators" class="carousel carousel-dark slide" data-bs-ride="carousel">
            <div class="carousel-indicators">
              <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
              <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
              <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
            </div>

            <div class="carousel-inner">
              <div :class="`carousel-item ${i==0 ? 'active' : ''}`" :key="i" v-for="(pimg, i) in productImage">
                <!-- <img :src="pimg.path" alt="" class="d-block w-100" > -->
                <img :src="`/download/${productId}/${pimg.path}`" alt="" class="d-block w-100" >
              </div>
            </div>

            <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
              <span class="carousel-control-prev-icon" aria-hidden="true"></span>
              <span class="visually-hidden">Previous</span>
            </button>
            <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
              <span class="carousel-control-next-icon" aria-hidden="true"></span>
              <span class="visually-hidden">Next</span>
            </button>
          </div>
        </div>

        <!-- 제품 설명 -->
        <div class="col-md-7">
          <div class="card shadow-sm">
            <div class="card-body">
              <p class="card-text pb-3">
                <span class="badge bg-dark me-1">{{productDetail.category1}}</span>
                <span class="badge bg-dark me-1">{{productDetail.category2}}</span>
                <span class="badge bg-dark">{{productDetail.category3}}</span>
              </p>
              <h5 class="card-title pt-3 pb-3 border-top">{{productDetail.product_name}}</h5>
              <h5 class="card-title pt-3 pb-3 border-top">{{getCurrencyFormat(productDetail.product_price)}} 원</h5>
              

              <p class="card-text pb-3">
                배송비 <strong>{{getCurrencyFormat(productDetail.delivery_price)}}</strong>원 | 도서산간(제주도) 배송비 추가 <strong>{{getCurrencyFormat(productDetail.add_delivery_price)}}</strong>원 |<br/> 택배배송 | <strong>{{productDetail.outbound_days}}</strong>일 이내 출고 (주말, 공휴일 제외)
              </p>

              <div class="card-text border-top pt-3 pb-3 totalPriceBox">
                <div class="row pCount">
                  <div class="col-auto">
                    <label class="col-from-label">구매수량</label>
                  </div>

                  <div class="col-auto">
                    <div class="input-group">
                      <span class="input-group-text" style="cursor: pointer" @click="calculatePrice(-1)">-</span>
                      <input type="text" class="form-control" style="width:40px" v-model="totalCount" />
                      <span class="input-group-text" style="cursor: pointer" @click="calculatePrice(+1)">+</span>
                    </div>
                  </div>
                </div>

                <div class="pTotalPrice">
                  <h5>총 상품 금액</h5>
                  <h5><strong>{{getCurrencyFormat(totalPrice)}}</strong> 원</h5>
                </div>
              </div>
              

              <div class="d-flex justify-content-between align-items-center">
                <div class="col-6 d-grid p-1">
                  <button type="button" class="btn btn-lg btn-dark">장바구니 담기</button>
                </div>
                <div class="col-6 d-grid p-1">
                  <button type="button" class="btn btn-lg btn-warning orderBtn">주문하기</button>
                </div>
              </div>

            </div> <!-- card-body -->
          </div> <!-- card -->
        </div>
      </div>



      <div class="row mt-3 tabMenu">

        <div class="col-12">
          <ul class="nav nav-tabs" id="myTab" role="tablist">
            <li class="nav-item" role="presentation">
              <button class="nav-link active" id="detailInfo-tab" data-bs-toggle="tab" data-bs-target="#detailInfo" type="button" role="tab" aria-controls="detailInfo" aria-selected="true">제품 상세정보</button>
            </li>
            <li class="nav-item" role="presentation">
              <button class="nav-link" id="pReview-tab" data-bs-toggle="tab" data-bs-target="#pReview" type="button" role="tab" aria-controls="pReview" aria-selected="false">제품 리뷰</button>
            </li>
            <li class="nav-item" role="presentation">
              <button class="nav-link" id="contact-tab" data-bs-toggle="tab" data-bs-target="#contact" type="button" role="tab" aria-controls="contact" aria-selected="false">배송/교환/반품</button>
            </li>
          </ul>
          <div class="tab-content" id="myTabContent">
            <div class="tab-pane fade show active" id="detailInfo" role="tabpanel" aria-labelledby="detailInfo-tab">
              <img :src="`/download/${productId}/${productDetail.path}`" alt="" class="img-fluid" />
            </div>
            <div class="tab-pane fade" id="pReview" role="tabpanel" aria-labelledby="pReview-tab">
              제품 리뷰 페이지 입니다.
            </div>
            <div class="tab-pane fade" id="contact" role="tabpanel" aria-labelledby="contact-tab">
              제품 배송/교환/반품 정보 페이지 입니다.
            </div>
          </div>
          <!-- <img :src="`/download/${productId}/${productDetail.path}`" alt="" class="img-fluid" /> -->
        </div>
      </div>

      

    </div>

  </main>
</template>
<script>
export default {
  name: '',
  data() {
    return {
      productId: 0,
      productDetail: [],
      productImage: [],
      totalCount: 1,
      totalPrice: 0
    };
  },
  created() {
    this.productId = this.$route.query.product_id;
    this.getProductDetail();
    this.getProductImage();
  },
  methods: {
    async getProductDetail() {
      let productDetail = await this.$api("/api/productDetail",{param:[this.productId]});
      if(productDetail.length > 0) {
        this.productDetail = productDetail[0];
        this.totalPrice = (this.productDetail.product_price * this.totalCount);
      }
      console.log(this.productDetail);
    },
    async getProductImage() {
      this.productImage = await this.$api("/api/productMainImages",{param:[this.productId]});
      console.log('this.productImage',this.productImage)

    },

    // 구매 수량 변경
    calculatePrice(cnt) {
      let totalCount = this.totalCount + cnt;
      if(totalCount < 1) totalCount = 1;
      this.totalCount = totalCount;
      this.totalPrice = (this.productDetail.product_price * this.totalCount);
    },
    getCurrencyFormat(value) {
      return this.$currencyFormat(value);
    },

    
  }
}
</script>
<style>
.section-productDetail .inner {
  align-items: center;
}

.section-productDetail .card-title {
  margin-bottom: 0;
}

.section-productDetail .totalPriceBox {
  display: flex;
  justify-content: space-between;
  text-align: center;
}


.section-productDetail .pCount {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

.section-productDetail .pTotalPrice {
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

.section-productDetail .pTotalPrice strong {
  margin-left: 10px;
  font-size: 1.875rem;
  color: #ff5100;
}

.section-productDetail .orderBtn {
  background: #ffb24d;
}

.section-productDetail .tabMenu .nav-link {
  color: #000;
}

.section-productDetail .tabMenu .nav-link.active {
  color: #ff5100;
}

.section-productDetail .tab-pane {
  padding: 40px 0;
}

.section-productDetail .tab-pane img {
  width: 100%;
  max-width: 700px;
}

@media all and (max-width: 500px) {
  .section-productDetail .totalPriceBox {
  flex-flow: column nowrap;
  justify-content: center;
}


.section-productDetail .pCount {
  justify-content: center;
}

.section-productDetail .pTotalPrice {
  justify-content: center;
  margin-top: 15px;
}
}
</style>