const target = 'http://127.0.0.1:3000'; //proxy 요청을 보낼 서버 주소

module.exports = {
  // css: {
  //   loaderOptions: {
  //       sass: {
  //           data: `
  //               @import "@/style/style.scss";
  //               //@는 /src 와 같다
  //           `
  //       }
  //   }
  // },
  devServer: {
    port: 8080,
    proxy: {
      // proxy 요청을 보낼 api 시작 부분
      '^/api': {
        target,
        changeOrigin: true
      },
      '^/upload': {
        target,
        changeOrigin: true
      },
      '^/download': {
        target,
        changeOrigin: true
      },
      '/oauth2.0': {
        target: 'https://nid.naver.com'
      }
    },
  }
}