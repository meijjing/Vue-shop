<template>
  <main class="mt-3 mb-3 section-create">
    <div class="container">
      <h2 class="text-center pb-2 border-bottom">제품 등록</h2>


      <div class="mt-3 mb-3 row">
        <label class="col-md-3 col-form-label">브랜드명</label>
        <div class="col-md-9">
          <input type="text" class="form-control" v-model="product.product_brand" />
        </div>
      </div>

      <div class="mb-3 row">
        <label class="col-md-3 col-form-label">제품명</label>
        <div class="col-md-9">
          <input type="text" class="form-control" v-model="product.product_name" />
        </div>
      </div>

      <div class="mb-3 row">
        <label class="col-md-3 col-form-label">가격</label>
        <div class="col-md-9">
          <div class="input-group">
            <input type="number" class="form-control" v-model="product.product_price" />
            <span class="input-group-text">원</span>
          </div>
        </div>
      </div>

      <div class="mb-3 row">
        <label class="col-md-3 col-form-label">배송비</label>
        <div class="col-md-9">
          <div class="input-group">
            <input type="number" class="form-control" v-model="product.delivery_price" />
            <span class="input-group-text">원</span>
          </div>
        </div>
      </div>

      <div class="mb-3 row">
        <label class="col-md-3 col-form-label">추가 배송비(도서산간)</label>
        <div class="col-md-9">
          <div class="input-group">
            <input type="number" class="form-control" v-model="product.add_delivery_price" />
            <span class="input-group-text">원</span>
          </div>
        </div>
      </div>


      <div class="mb-3 row">
        <label class="col-md-3 col-form-label">제품 카테고리</label>
        <div class="col-md-9">
          <div class="row">

            <div class="col-auto">
              <select class="form-select" v-model="cate1" @change="changeCategory1">
                <option :value="cate" :key="i" v-for="(cate, i) in category1">{{cate}}</option>
              </select>
            </div>

            <div class="col-auto">
              <select class="form-select" v-model="cate2" @change="changeCategory2">
                <option :value="cate" :key="i" v-for="(cate, i) in category2">{{cate}}</option>
              </select>
            </div>

            <div class="col-auto">
              <select class="form-select" v-model="cate3">
                <option :value="cate" :key="i" v-for="(cate, i) in category3">{{cate}}</option>
              </select>
            </div>

          </div>
        </div>
      </div>


      <div class="mb-3 row">
        <label class="col-md-3 col-form-label">태그</label>
        <div class="col-md-9">
          <input type="text" class="form-control" v-model="product.tags" />
        </div>
      </div>


      <div class="mb-3 row">
        <label class="col-md-3 col-form-label">출고일</label>
        <div class="col-md-9">
          <div class="input-group">
            <input type="number" class="form-control" v-model="product.outbound_days" />
            <span class="input-group-text">일 이내 출고</span>
          </div>
        </div>
      </div>



      <div class="pt-4 mb-3 row border-top">
        <label class="col-md-3 col-form-label">썸네일 이미지</label>

        <div class="col-md-9">

          <div class="row">
            <!-- <div class="col-lg-3 col-md-4 col-sm-2" :key="i" v-for="(m,i) in productImage.filter(c=>c.type==1)"> -->
            <div class="col-lg-3 col-md-4 col-sm-2">
              <div class="position-relative">
                <!-- <img :src="`/download/${productId}/${m.path}`" alt="" class="img-fluid" /> -->
                <!-- <div class="position-absolute top-0 end-0" style="cursor:pointer;" @click="deleteImage(m.id)">X</div> -->
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



      <div class="mb-3 row">
        <label class="col-md-3 col-form-label">제품 이미지</label>
        <div class="col-md-9">
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



      <div class="mb-3 row">
        <label class="col-md-3 col-form-label">제품 설명 이미지</label>
        <div class="col-md-9">
          <input type="file" class="form-control" accept="image/png, image/jpg, image/jpeg" multiple @change="uploadFile($event.target.files, 3)" />
          <div class="alert alert-secondary" role="alert">
            <ul>
              <li>파일 사이즈: 5M 이하</li>
              <li>파일 확장자: png, jpg, jpeg만 가능</li>
            </ul>
          </div>
        </div>
      </div>

      


      <div class="d-flex justify-content-between align-items-center">
        <div class="col-6 d-grid p-1">
          <button type="button" class="btn btn-lg btn-dark" @click="goToList">취소하기</button>
        </div>
        <div class="col-6 d-grid p-1">
          <button type="button" class="btn btn-lg btn-danger" @click="productInsert">저장하기</button>
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
      productList: [],
      productId: 1,
      productImage: [],
      product: {
        product_brand: "",
        product_name: "",
        product_price: 0,
        delivery_price: 0,
        add_delivery_price: 0,
        tags: "",
        outbound_days: 0,
        category_id: 1,
        seller_id: 1
      },
      categoryList: [],
      category1:[],
      category2:[],
      category3:[],
      cate1: "",
      cate2: "",
      cate3: ""
    };
  },
  created() {
    this.getCategoryList();
    this.getProductList();
    this.getProductImage();
  },
  // mounted() {
  //   if(this.user.email == undefined) {
  //     alert("로그인을 해야 이용할 수 있습니다.");
  //     this.$router.push({path:'/'}); 
  //   }
  // },

  methods: {
    // 취소 버튼 클릭 시, 리스트로 돌아가기
    goToList(){
      this.$router.push({path:'/sales'}); 
    },

    // 카테고리 리스트 level1 -> level2 -> level3
    async getCategoryList(){
      let categoryList = await this.$api("/api/categoryList",{});
      this.categoryList = categoryList;
      console.log(categoryList);
      

      // 카테고리 level1
      let oCategory = {};
      categoryList.forEach(item => {
        oCategory[item.category1] = item.id;
      });
      let category1 = [];
      for(let key in oCategory) {
        category1.push(key);
      }
      this.category1 = category1;
      // console.log(category1);


      // 카테고리 level2
      let category2 = [];
      category2 = categoryList.filter(c => {
        return c.category1 == category1[0];
      });
      console.log(category2);

      let oCategory2 = {};
      category2.forEach(item => {
        oCategory2[item.category2] = item.id;
      });

      category2 = [];
      for(let key in oCategory2) {
        category2.push(key);
      }
      this.category2 = category2;
      // console.log(category2);
    },
    

    // 카테고리1이 변경 되었을 때
    changeCategory1(){
      // this.cate1
      this.category3 = []; // 카테고리3 클리어
      let categoryList = this.categoryList.filter(c => {
        return c.category1 == this.cate1;
      });
      let oCategory2 = {};
      categoryList.forEach(item => {
        oCategory2[item.category2] = item.id;
      });
      let category2 = [];
      for(let key in oCategory2) {
        category2.push(key);
      }
      this.category2 = category2;
    },


    // 카테고리2가 변경 되었을 때
    changeCategory2(){
      let categoryList = this.categoryList.filter(c => {
        return (c.category1 == this.cate1 && c.category2 == this.cate2);
      });
      let oCategory3 = {};
      categoryList.forEach(item => {
        oCategory3[item.category3] = item.id;
      });
      let category3 = [];
      for(let key in oCategory3) {
        category3.push(key);
      }
      this.category3 = category3;
    },


    // 이미지 업로드 시
    async getProductList() {
      this.productList = await this.$api("/api/productList", {});
      this.productId = this.productList.length + 1;
      // console.log(this.productId);
    },
    

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
    async getProductImage() {
      this.productImage = await this.$api("/api/imageList",{param:[this.productId]});
      console.log('this.productImage',this.productImage)
    },


    // 제품 저장하기 클릭 시, 데이터 저장
    productInsert() {
      if(this.product.product_brand == "") {
        return this.$swal("브랜드명은 필수 입력값입니다.");
      }
      if(this.product.product_name == "") {
        return this.$swal("제품명은 필수 입력값입니다.");
      }
      if(this.product.product_price == "" || this.product.product_price == 0) {
        return this.$swal("제품 가격을 입력하세요.");
      }
      if(this.product.delivery_price == "" || this.product.delivery_price == 0) {
        return this.$swal("배송비를 입력하세요.");
      }
      if(this.product.outbound_days == "" || this.product.outbound_days == 0) {
        return this.$swal("출고일을 입력하세요.");
      }
      this.product.category_id = this.categoryList.filter(c => {
        return (c.category1 == this.cate1 && c.category2 == this.cate2 && c.category3 == this.cate3);
      })[0].id;
      // console.log(this.product.category_id);


      this.$swal.fire({
        title: '정말 등록 하시겠습니까?',
        showCancelButton: true,
        confirmButtonText: `생성`,
        cancelButtonText: `취소`
      }).then(async (result) => {
        if (result.isConfirmed) {
          await this.$api("/api/productInsert",{param:[this.product]});
          this.$swal.fire('저장되었습니다!', '', 'success');
          this.$router.push({path:'/sales'});
        } 
      });
    }
  }
}
</script>

<style lang="scss">
.section-create {
  .row {
    align-items: center;
  }
  .section-create .row label {
    text-align: left;
  }
  .section-create .row select {
    width: 110px;
  }
}
</style>