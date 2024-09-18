const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  filenameHashing: false,
  outputDir: 'dist',
  // publicPath: process.env.NODE_ENV === 'production'
  //   ? '/selects/dist/'
  //   : '/',
  chainWebpack: config => {
    config.optimization.delete("splitChunks");
  },
  parallel: false,
  chainWebpack: (config) => {
    config.module
      .rule('vue')
      .use('vue-loader')
      .tap((options) => ({
        ...options,
        compilerOptions: {
          // treat any tag that starts with ion- as custom elements
          isCustomElement: (tag) => tag.startsWith('ion-')
        }
      })),
      config.optimization.delete("splitChunks");
  }

})
