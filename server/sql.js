module.exports = {
  // 제품 리스트
  productList: {
    query: `select t1.*, t2.path, t3.category1, t3.category2, t3.category3 
    from t_product t1, t_image t2, t_category t3
    where t1.id = t2.product_id and t2.type = 1 and t1.category_id = t3.id`
  },

  productList2: {
    query: `select t3.*, t4.path from (select t1.*, t2.category1, t2.category2, t2.category3 
      from t_product t1, t_category t2
      where t1.category_id = t2.id) t3
      left join (select * from t_image where type=1) t4
      on t3.id = t4.product_id`
  },

  // 제품 상세 정보
  productDetail: {
    query: `select t1.*, t2.path, t3.category1, t3.category2, t3.category3 
    from t_product t1, t_image t2, t_category t3
    where t1.id = ? and t1.id = t2.product_id and t2.type = 3 and t1.category_id = t3.id`
  },

  // 제품 이미지
  productMainImages: {
    query: `select * from t_image where product_id = ? and type = 2`
  },

  // 제품 등록
  productInsert: {
    query: `insert into t_product set ?`
  },

  // 제품 이미지 등록
  productImageInsert: {
    query: `insert into t_image set ?`
  },

  imageList: {
    query: `select * from t_image where product_id=?`
  },

  imageDelete: {
    query: `delete from t_image where id=?`
  },

  productDelete: {
    query: `delete from t_product where id=?`
  },

  // 카테고리 리스트
  categoryList: {
    query: `select * from t_category`
  },

  // 판매자 리스트
  sellerList: {
    query: `select * from t_seller`
  },

  signUp: {
    query: `insert into t_user set ? on duplicate key update ?`
  },

  // 제품 수정
  productUpdate: {
    // query: `update t_product set product_brand = '', product_name = '', product_price = '', delivery_price = '', add_delivery_price = '', tags = '', outbound_days = '' where id = ''`
    query: `update t_product set ? where id = ?`
  }

}