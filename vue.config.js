const UnusedWebpackPlugin = require('unused-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const path = require('path')
const fs = require('fs')
const sharp = require('responsive-loader/sharp')
const appDirectory = fs.realpathSync(process.cwd())
const resolveApp = relativePath => path.resolve(appDirectory, relativePath)
const root = path.resolve(__dirname, resolveApp('src'))
const { ArgumentParser } = require('argparse')

const parser = new ArgumentParser({
  addHelp: true,
})

if (process.env.NODE_ENV === 'production') {
  parser.addArgument('build')
  parser.addArgument(['--set-build-version'], {
    metavar: 'VALUE',
    help: 'Set build version env key. Equivalent to --env-arg BUILD_VERSION [VALUE]',
    type: 'string',
    dest: 'setBuildVersion',
  })
  const args = parser.parseArgs()

  if (args.setBuildVersion) {
    process.env.VUE_APP_BUILD_VERSION = args.setBuildVersion
  }
}

const optionalPlugins = []

if (process.env.NODE_ENV !== 'test') {
  optionalPlugins.push(
    new UnusedWebpackPlugin({
      directories: [path.join(__dirname, 'src')],
      failOnUnused: process.env.NODE_ENV === 'production',
      exclude: ['*.spec.js', '*.e2e.js', '*.md', 'test/*'],
    }),
  )
}

module.exports = {
  devServer: {
    port: 8095,
  },
  runtimeCompiler: true,
  configureWebpack: {
    devtool: process.env.NODE_ENV === 'production' ? 'false' : 'source-map',
    plugins: [
      new CopyWebpackPlugin([
        {
          from: path.resolve(__dirname, resolveApp('static/init-loader')),
          to: 'static/init-loader',
        },
        {
          from: path.resolve(__dirname, resolveApp('static/noscript')),
          to: 'static/noscript',
        },
        {
          from: path.resolve(__dirname, resolveApp('static/branding/favicon.png')),
          to: 'static/branding/favicon.png',
        },
        {
          from: path.resolve(__dirname, resolveApp('static/branding/logo.png')),
          to: 'static/branding/logo.png',
        },
      ]),
      ...optionalPlugins,
    ],
    resolve: {
      symlinks: false,
      alias: {
        '@': `${root}/`,
        '@static': path.resolve(__dirname, resolveApp('static')),
        '@scss': `${root}/scss`,
      },
    },
  },
  css: {
    loaderOptions: {
      sass: {
        sourceMap: true,
      },
    },
  },
  transpileDependencies: ['vuetify'],
  pluginOptions: {
    i18n: {
      locale: 'en',
      fallbackLocale: 'en',
      localeDir: 'locales',
      enableInSFC: false,
    },
  },

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

    const moduleTypes = ['vue-modules', 'vue', 'normal-modules', 'normal']
    moduleTypes.forEach(rule => {
      config.module.rule('scss')
        .oneOf(rule)
        .use('resolve-url-loader')
        .loader('resolve-url-loader')
        .before('sass-loader')
        .end()
        .use('sass-loader')
        .loader('sass-loader')
        .tap(options => ({
          ...options,
          sourceMap: true,
        }))
    })

    config.module
      .rule('images')
      .test(/^((?!\/node_modules).)*(\.png|\.jpg|\.jpeg)$/)
      .use('url-loader')
      .loader('url-loader')
      .tap(options => {
        options.esModule = false
        const fallback = options.fallback
        fallback.loader = 'responsive-loader'
        fallback.options = {
          ...fallback.options,
          adapter: sharp,
          name: 'img/[name]-[hash]-[width].[ext]',
          sizes: [375, 768, 1200, 1920, 2880, 3840],
        }

        return options
      })
  },
}
