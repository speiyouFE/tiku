var path = require('path');
const pkg = require('./package.json')

const resDir = 'static';
const _BANNER = [
  ' '+pkg.name + ' v'+pkg.version,
  ' Author    : '+pkg.author,
  ' Copyright : '+new Date().getFullYear()
].join('\n');

module.exports = {
  baseUrl:'//chn-paper.sealui.com',
  assetsDir : resDir,
  outputDir : 'wwwroot',
  compiler: false,
  css : {

  },
  lintOnSave : false,

  chainWebpack: config => {
    config.devtool(false)
    config.module
      .rule('js')
        .exclude
          .add(/utils\/popper\.js|utils\/date.\js/)
          .end()
    config.module
      .rule('eslint')
      .pre()
      .exclude
        .add(/node_modules|src/)
        .end()
    config.resolve
      .alias
        .set('vue$','vue/dist/vue.min.js')
        .set('sealui',path.resolve(__dirname, './src/packages'))
        .end()

    // production
    if (process.env.NODE_ENV === 'production') {
      config.output
        .filename(resDir+'/js/[chunkhash:20].js')
        .chunkFilename(resDir+'/js/[chunkhash:20].js')
        .library('SealUI')
        .libraryTarget('umd')
        .umdNamedDefine(false)
      config.externals({
        "vue"        : "Vue",
        "vuex"       : "Vuex",
        "axios"      : "axios",
        "vue-router" : "VueRouter"
      })
      config
        .plugin('banner')
          .use(require('webpack/lib/BannerPlugin'),[_BANNER])
          .end()
      config
        .plugin('html')
          .tap(([options]) => [Object.assign(options, {
            filename : 'index.html',
            releaseTime: (new Date()).getTime()
          })])
    }else{
      config
        .plugin('html')
          .tap(([options]) => [Object.assign(options, {
            filename : 'index.html',
            releaseTime: (new Date()).getTime()
          })])
    }
  },
  devServer : {
    proxy : {
      '/chn': {
        target: 'http://47.95.4.35:8081/',
        changeOrigin: true,
        pathRewrite: {
          '^/chn': '/chn'
        }
      },
      '/class': {
        target: 'http://47.95.4.35:8081/',
        changeOrigin: true,
        pathRewrite: {
          '^/class': '/class'
        }
      },
      '/paperFolders': {
        target: 'http://47.95.4.35:8081/',
        changeOrigin: true,
        pathRewrite: {
          '^/paperFolders': '/paperFolders'
        }
      },
    }
  }
}
