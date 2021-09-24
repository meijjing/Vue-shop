<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container-fluid">
      <router-link class="navbar-brand" to="/">
        <img src="../assets/logo.png" alt="" />
      </router-link>

      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">

        


        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link class="nav-link active" to="/">홈</router-link>
          </li>
          <!-- <li class="nav-item">
            <router-link class="nav-link" to="/detail">제품 상세 페이지</router-link>
          </li> -->
          <li class="nav-item">
            <router-link class="nav-link" to="/create">제품 등록 페이지</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/sales">제품 리스트</router-link>
          </li>
          <li v-if="user.email = undefined">
            <button type="button" class="btn btn-light">로그인</button>
          </li>
          <li v-else>
            <button type="button" class="btn btn-light">로그아웃</button>
          </li>
        </ul>


        <form class="d-flex searchBox">
          <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
          <button class="btn btn-light" type="submit">Search</button>
        </form>

      </div>
    </div>
  </nav>
</template>
<script>
export default {
  name: 'Header',
  computed: {
    user() {
      return this.$store.state.user;
    }
  },
  methods: {
    kakaoLogin() {
      window.Kakao.Auth.login({
        scope : 'profile_nickname, account_email',
        success : this.getKakaoAccount,
      })
    },
    getKakaoAccount(authObj) {
      console.log(authObj);

      window.Kakao.API.request({
        url:'/v2/user/me',
        success: res => {
          const kakao_account = res.kakao_account;
          console.log(kakao_account);
          this.login(kakao_account);
          // const nickname = kakao_account.profile.nickname;
          // const email = kakao_account.email;
          // console.log('nickname', nickname);
          // console.log('email', email);

          // 로그인 처리 구현
          alert("로그인 성공!!");
          // this.$store.commit("user", kakao_account);
        },
        fail: error => {
          console.log(error);
        }
      })
    },
    async login(kakao_account) {
      await this.$api("/api/login", {
        param: [
          {email:kakao_account.eamil, nickname:kakao_account.profile.nickname},
          {nickname:kakao_account.profile.nickname}
        ]
      })
    },
    kakaoLogout() {
      window.Kakao.Auth.logout((res) => {
        //로그아웃
        console.log(res);
        this.$store.commit("user", {});
        alert("로그아웃 되었습니다.");
        this.$router.push({path: "/"});
      })
    },
  }
}
</script>

<style>
.navbar {
  background: #131921!important;
}

.navbar-brand img {
    width: 120px;
}

.navbar-nav button {
  margin-left: 10px;
  background: #ffb24d;
  border: none;
}

.searchBox button {
  background: #ffb24d;
}

</style>