const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  outputDir: "../vue+springboot/demo/src/main/resources/static/vue", // 빌드 결과물이 생성되는 경로
  devServer: {
    proxy: {
      "/api": {
        target: "http://localhost:8081",
        changeOrigin: true,
      },
    },
  },
  indexPath: "../../templates/vue/index.html", // 빌드된 파일이 생성될 때, index.html 파일의 경로를 지정
  publicPath: "/vue", // 웹팩 아웃풋의 정적 자원들이 위치할 기본 경로를 지정
  lintOnSave: false,
});
