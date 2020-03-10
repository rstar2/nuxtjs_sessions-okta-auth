const consola = require('consola');
/**
 * Route middleware that check if the user is already authenticated.
 * If route is desired to be only for authenticated users (e.g. meta.needsAuth === true)
 * then protect it.
 *
 * Note a middleware can be asynchronous. To do this,
 * simply return a Promise or use the 2nd callback argument:
 * @param {Nuxt.Context} context
 */
export default function({ req, store, app, route, redirect }) {
  // If nuxt generate, pass this middleware
  // if (process.server && !req) return;

  // If SSR (nuxt generate or nuxt pre-render), pass this middleware
  // if (process.server) return;

  consola.info('Middleware authorized');

  // const loggedUser = process.server ? getUserFromCookie(req) : getUserFromLocalStorage();
  // store.commit('SET_USER', loggedUser);

  // check using the route path name
  // const needsAuth = route.matched.some(record => record.path === '/admin');

  // check using the route meta - NOTE that route.meta will be array as it can point/define
  // multiple/nested page components
  const needsAuth = route.meta.reduce((needsAuth, meta) => needsAuth || meta.needsAuth === true, false);

  if (needsAuth) {
    const isAuth = store.getters.isAuth;

    // user should be authenticated
    if (!isAuth) {
      app.$logger.info('Route Middleware - only for authenticated users');
      redirect('/');
    }
  }
}
