import { NEED_AUTH, NEED_AUTH_ADMIN, NEED_NO_AUTH } from '@/lib/AuthMode.js';

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
  consola.info('Middleware authorized');

  // If nuxt generate, pass this middleware
  if (process.server && !req) return;

  // const loggedUser = process.server ? getUserFromCookie(req) : getUserFromLocalStorage();
  // store.commit('SET_USER', loggedUser);

  // check using the route path name
  // const needsAuth = route.matched.some(record => record.path === '/admin');

  // check using the route meta - NOTE that route.meta will be array as it can point/define
  // multiple/nested page components
  const authMode = route.meta.reduce((authModeAcc, meta) => {
    const authModeCur = meta.authMode;
    switch (authModeAcc) {
      case NEED_NO_AUTH:
        if (!authModeCur && authModeCur !== NEED_NO_AUTH) throw new Error('Nested routes have mismatched authModes');
        return NEED_NO_AUTH;
      case NEED_AUTH:
        if (!authModeCur && authModeCur === NEED_NO_AUTH) throw new Error('Nested routes have mismatched authModes');
        return authModeCur === NEED_AUTH_ADMIN ? NEED_AUTH_ADMIN : NEED_AUTH;
      case NEED_AUTH_ADMIN:
        if (!authModeCur && authModeCur === NEED_NO_AUTH) throw new Error('Nested routes have mismatched authModes');
        return NEED_AUTH_ADMIN;
      default:
        return authModeCur;
    }
  }, null);

  // TODO: Not a proper way as it clears the error always
  store.commit('notification', null);

  // return fast if no need fo any checks
  if (!authMode) return;

  const isAuth = store.getters.isAuth;

  switch (authMode) {
    case NEED_NO_AUTH:
      // user should NOT be authenticated
      if (isAuth) {
        consola.info('Route Middleware - only for not-authenticated users');
        store.commit('notification', 'Only for not-authenticated users');
        redirect('/');
      }
      break;
    case NEED_AUTH:
      // user should be authenticated
      if (!isAuth) {
        consola.info('Route Middleware - only for authenticated users');
        store.commit('notification', 'Only for authenticated users');
        redirect('/');
      }
      break;
    case NEED_AUTH_ADMIN:
      // user should be admin
      if (!store.getters.isAdmin) {
        consola.info('Route Middleware - only for admin users');
        store.commit('notification', 'Only for admin users');
        redirect('/');
      }
      break;
    default:
      throw new Error(`Invalid auth mode: ${authMode}`);
  }
}
