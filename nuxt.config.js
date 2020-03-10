const colors = require('vuetify/es5/util/colors').default;

module.exports = {
  mode: 'universal',
  /*
   ** Headers of the page
   */
  head: {
    titleTemplate: '%s - ' + process.env.npm_package_name,
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || ''
      }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },
  /*
   ** Global CSS
   */
  css: [],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [],

  /*
   ** Router config:

   ** For Middlewares: Every middleware should be placed in the middleware/ directory.
   ** The filename will be the name of the middleware
   ** (middleware/auth.js will be the auth middleware).
   ** The middleware will be executed in series in this order:
   **      1. nuxt.config.js (in the order within the file)
   **      2. Matched layouts (defined in "middleware: String[]")
   **      3. Matched pages (defined in "middleware: String[]")
   */
  router: {
    // call this router middleware always for every route - in client and SSR,
    // later in it there could be separation for the client and SSR modes
    // middleware: 'authorized',
    middleware: ['authorized']
  },

  serverMiddleware: [
    // Custom API server routes
    '~/server/middleware/api.js',
    '~/server/middleware/auth.js'
  ],

  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module',
    '@nuxtjs/vuetify'
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    // Doc: https://github.com/nuxt-community/dotenv-module
    '@nuxtjs/dotenv',
    // Doc: https://auth.nuxtjs.org/usage
    '@nuxtjs/auth',

    // Server sessions support (using express-session internally)
    [
      'nuxt-session',
      // {
      //   // express-session options:
      //   name: 'sessionId',
      //   secret: 'some secret key'
      // }
      (session) => {
        // Use the session object:
        const RedisStore = require('connect-redis')(session);
        const redis = require('redis').createClient({
          host: 'localhost',
          port: '6379'
        });

        return {
          name: 'sessionId',
          secret: 'some secret key',
          cookie: {
            maxAge: 1000 * 60 * 60 * 24 * 7 * 52 * 2 // 2 years
          },
          saveUninitialized: true,
          resave: false,
          store: new RedisStore({ client: redis })
        };
      }
    ]
  ],
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {},
  /*
   ** Axios module configuration
   ** See https://auth.nuxtjs.org/options
   */
  auth: {
    strategies: {
      local: {
        endpoints: {
          login: { url: 'login', method: 'post', propertyName: 'data.token' },
          user: { url: 'me', method: 'get', propertyName: 'data' },
          logout: false
        }
      }
    }
  },
  /*
   ** vuetify module configuration
   ** https://github.com/nuxt-community/vuetify-module
   */
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: true,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        }
      }
    }
  },
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {}
  }
};
