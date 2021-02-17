module.exports = {
  devServer: {
    disableHostCheck: true,
  },
  runtimeCompiler: true,
  transpileDependencies: ['vuetify'],
  pluginOptions: {
    i18n: {
      locale: 'en',
      fallbackLocale: 'en',
      localeDir: 'locales',
      enableInSFC: false,
    },
  },
}
