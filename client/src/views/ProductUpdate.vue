<template>
  <main class="mt-3 mb-3 section-update">
    <div class="container">
      <h2 class="text-center pb-2 border-bottom">제품 수정</h2>

      <div class="mt-3 mb-3 row">
        <label class="col-md-3 col-form-label">브랜드명</label>
        <div class="col-md-9">
          <input type="text" class="form-control" v-model="productDetail.product_brand" />
        </div>
      </div>

      <div class="mb-3 row">
        <label class="col-md-3 col-form-label">제품명</label>
        <div class="col-md-9">
          <input type="text" class="form-control" v-model="productDetail.product_name" />
        </div>
      </div>

      <div class="mb-3 row">
        <label class="col-md-3 col-form-label">제품가격</label>
        <div class="col-md-9">
          <div class="input-group">
            <input type="number" class="form-control" v-model="productDetail.product_price" />
            <span class="input-group-text">원</span>
          </div>
        </div>
      </div>
      <div class="mb-3 row">
        <label class="col-md-3 col-form-label">배송비</label>
        <div class="col-md-9">
          <div class="input-group">
            <input type="number" class="form-control" v-model="productDetail.delivery_price" />
            <span class="input-group-text">원</span>
          </div>
        </div>
      </div>

      <div class="mb-3 row">
        <label class="col-md-3 col-form-label">추가 배송비(도서산간)</label>
        <div class="col-md-9">
          <div class="input-group">
            <input type="number" class="form-control" v-model="productDetail.add_delivery_price" />
            <span class="input-group-text">원</span>
          </div>
        </div>
      </div>

      <div class="mb-3 row">
        <label class="col-md-3 col-form-label">제품 카테고리</label>

        <div class="col-md-9">
          <div class="row">

            <div class="col-auto">
              <select class="form-select">
                <option>{{productDetail.category1}}</option>
              </select>
            </div>

            <div class="col-auto">
              <select class="form-select">
                <option>{{productDetail.category2}}</option>
              </select>
            </div>

            <div class="col-auto">
              <select class="form-select">
                <option>{{productDetail.category3}}</option>
              </select>
            </div>

          </div>
        </div>

      </div>


      <div class="mb-3 row">
        <label class="col-md-3 col-form-label">태그</label>
        <div class="col-md-9">
          <input type="text" class="form-control" v-model="productDetail.tags">
        </div>
      </div>

      <div class="mb-3 row">
        <label class="col-md-3 col-form-label">출고일</label>
        <div class="col-md-9">
          <div class="input-group">
            <input type="number" class="form-control" v-model="productDetail.outbound_days">
            <span class="input-group-text">일 이내 출고</span>
          </div>
        </div>
      </div>



      <div class="pt-4 mb-3 row border-top">
        <label class="col-md-3 col-form-label">썸네일 이미지</label>

        <div class="col-md-9">
          <div class="row mb-2">
            <div class="col-lg-3 col-md-4 col-sm-2" :key="i" v-for="(m,i) in productImage.filter(c=>c.type==1)">
              <div class="pimg_box">
                <img :src="`/download/${productId}/${m.path}`" alt="" class="img-fluid" />
                <div class="del_btn" @click="deleteImage(m.id)">
                  <i class="fa fa-times-circle"></i>
                </div>
              </div>
            </div>
          </div>

          <input type="file" class="form-control" accept="image/png, image/jpg, image/jpeg" @change="uploadFile($event.target.files, 1)" />
          <div class="alert alert-secondary" role="alert">
            <ul>
              <li>이미지 사이즈: 350*350</li>
              <li>파일 사이즈: 1M 이하</li>
              <li>파일 확장자: png, jpg, jpeg만 가능</li>
            </ul>
          </div>
        </div>
      </div>



      <div class="pt-4 mb-3 row border-top">
        <label class="col-md-3 col-form-label">제품 이미지</label>
        <div class="col-md-9">

          <div class="row mb-2">
            <div class="col-lg-3 col-md-4 col-sm-2" :key="i" v-for="(m,i) in productImage.filter(c=>c.type==2)">
              <div class="pimg_box">
                <img :src="`/download/${productId}/${m.path}`" alt="" class="img-fluid" />
                <div class="del_btn" @click="deleteImage(m.id)">
                  <i class="fa fa-times-circle"></i>
                </div>
              </div>
            </div>
          </div>

          <input type="file" class="form-control" accept="image/png, image/jpg, image/jpeg" multiple @change="uploadFile($event.target.files, 2)"  />
          <div class="alert alert-secondary" role="alert">
            <ul>
              <li>최대 5개 가능</li>
              <li>이미지 사이즈: 700*700</li>
              <li>파일 사이즈: 1M 이하</li>
              <li>파일 확장자: png, jpg, jpeg만 가능</li>
            </ul>
          </div>
        </div>
      </div>



      <div class="pt-4 mb-3 row detail_img border-top">
        <label class="col-md-3 col-form-label">제품 설명 이미지</label>

        <div class="col-md-9">
          <div class="col-lg-6 col-md-4 mb-2" :key="i" v-for="(m,i) in productImage.filter(c=>c.type==3)">
            <div class="pimg_box">
              <img :src="`/download/${productId}/${m.path}`" alt="" class="img-fluid" />
              <div class="del_btn" @click="deleteImage(m.id)">
                <i class="fa fa-times-circle"></i>
              </div>
            </div>
          </div>
          <input type="file" class="form-control" accept="image/png, image/jpg, image/jpeg" multiple @change="uploadFile($event.target.files, 3)" />
          <div class="alert alert-secondary" role="alert">
            <ul>
              <li>파일 사이즈: 5M 이하</li>
              <li>파일 확장자: png, jpg, jpeg만 가능</li>
            </ul>
          </div>
        </div>
      </div>



      <div class="mb-3 row">
        <div class="col-6 d-grid p-1">
          <button type="button" class="btn btn-lg btn-dark" @click="goToList">취소하기</button>
        </div>
        <div class="col-6 d-grid p-1">
          <button type="button" class="btn btn-lg btn-danger" @click="productUpdate(productDetail, productDetail.id)">수정하기</button>
        </div>
      </div>

    </div>
  </main>
</template>
<script>
export default {
  data() {
    return {
      productId: 0,
      productDetail: [],
      productName: "",
      productImage: [],
    };
  },
  computed: {
    user() {
      return this.$store.state.user;
    }
  },
  mounted() {
    // if(this.user.email == undefined) {
    //   alert("로그인을 해야 이용할 수 있습니다.");
    //   this.$router.push({path:'/'}); 
    // }
  },
  created() {
    this.productId = this.$route.query.product_id;
    this.getProductDetail();
    this.getProductImage();
  },
  methods: {
    goToList(){
      this.$router.push({path:'/sales'}); 
    },

    // 제품 정보 불러오기
    async getProductDetail() {
      let productDetail = await this.$api("/api/productDetail",{param:[this.productId]});
      if(productDetail.length > 0) {
        this.productDetail = productDetail[0];
      }
      console.log(this.productDetail);
    },

    // 이미지 불러오기
    async getProductImage() {
      this.productImage = await this.$api("/api/imageList",{param:[this.productId]});
      console.log('this.productImage',this.productImage)
    },

    // 이미지 삭제 시
    deleteImage(id) {
      this.$swal.fire({
        title: '정말 삭제 하시겠습니까?',
        showCancelButton: true,
        confirmButtonText: `삭제`,
        cancelButtonText: `취소`
      }).then(async (result) => {
        if (result.isConfirmed) {
          await this.$api("/api/imageDelete",{param:[id]});
          this.getProductImage();
          this.$swal.fire('삭제되었습니다!', '', 'success');
        } 
      });
    },

    // 이미지 업로드 시
    async uploadFile(files, type) {
      let name = "";
      let data = null;
      if (files) {
        name = files[0].name;
        data = await this.$base64(files[0]);
      }
      const { error } = await this.$api(`/upload/${this.productId}/${type}/${name}`, { data });
      if (error) {
        return this.$swal("이미지 업로드 실패했습니다. 다시 시도하세요.");
      }
      this.$swal("이미지가 업로드 되었습니다.");
      setTimeout(() => {
        this.getProductImage();
      }, 1000);
    },

    // 제품 수정하기 클릭 시, 데이터 저장
    productUpdate(p, id) {
      console.log(p);
      console.log(id);
      if(p.product_brand == "") {
        return this.$swal("브랜드명은 필수 입력값입니다.");
      }
      if(p.product_name == "") {
        return this.$swal("제품명은 필수 입력값입니다.");
      }
      if(p.product_price == "" || p.product_price == 0) {
        return this.$swal("제품 가격을 입력하세요.");
      }
      if(p.delivery_price == "" || p.delivery_price == 0) {
        return this.$swal("배송비를 입력하세요.");
      }
      if(p.outbound_days == "" || p.outbound_days == 0) {
        return this.$swal("출고일을 입력하세요.");
      }


      this.$swal.fire({
        title: '정말 수정 하시겠습니까?',
        showCancelButton: true,
        confirmButtonText: `수정`,
        cancelButtonText: `취소`
      }).then(async (result) => {
        
        // if (result.isConfirmed) {
        //   await this.$api("/api/productUpdate",{param: [p]});

          
        //   this.$swal.fire('수정되었습니다!', '', 'success');
        //   this.$router.push({path:'/sales'});
        // } 
      });
    }

  }
}
</script>

<style lang="scss">

.section-update {
  .row {
    align-items: center;

    label {
      text-align: left;
    }

    select {
      width: 110px;
    }
  }
  .pimg_box {
    position: relative;

    img {
      width: 100%;
      box-shadow: 1px 1px 2px 1px rgba(0,0,0,0.2);
    }
  }

  .del_btn {
    position: absolute;
    top: 0;
    right: 8px;
    cursor: pointer;
    font-size: 1.875rem;
    color: #ee8015;
  }

  .detail_img .pimg_box {
    height: 200px;
    overflow: hidden;
  }

} 
</style>