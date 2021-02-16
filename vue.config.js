module.exports = {
  devServer: {
    disableHostCheck: true,
  },
  runtimeCompiler: true,
  transpileDependencies: ['vuetify'],
  chainWebpack: config => {
    // Exclude workers to not be parsed by other JS loaders
    config.module.rule('js').exclude.add(/\/workers\/.+\.js$/)

    // Worker loader configuration
    const workerRule = config.module.rule('worker')
    workerRule
      .test(/\/workers\/.+\.js$/)
      .use('worker-loader')
      .loader('worker-loader')
      .options({ inline: true, fallback: false })
      .end()
      .use('babel-loader')
      .loader('babel-loader')

    // Pre-fetching ALL the chunks harms the app performance
    config.plugins.delete('prefetch')

    config.module
      .rule('scss')
      .oneOf('vue')
      .use('resolve-url-loader')
      .loader('resolve-url-loader')
      .before('sass-loader')
      .end()
      .end()
      .oneOf('vue-modules')
      .use('resolve-url-loader')
      .loader('resolve-url-loader')
      .before('sass-loader')
      .end()
      .end()
      .oneOf('normal')
      .use('resolve-url-loader')
      .loader('resolve-url-loader')
      .before('sass-loader')
      .end()
      .end()
      .oneOf('normal-modules')
      .use('resolve-url-loader')
      .loader('resolve-url-loader')
      .before('sass-loader')
      .end()
      .end()
      .end()
  },
  pluginOptions: {
    i18n: {
      locale: 'en',
      fallbackLocale: 'en',
      localeDir: 'locales',
      enableInSFC: false,
    },
  },
}
