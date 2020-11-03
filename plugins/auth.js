const consola = require('consola');

/**
 * Plugin that check if the user is already authenticated.
 *
 * Note a plugin can be asynchronous. To do this,
 * simply return a Promise or use the 2nd callback argument:
 * @param {Nuxt.Context} context
 */
export default function({ req, store }) {
  consola.info('Plugin auth');

  // if SSR (but NOT in the 'nuxt generate' case) - store the user in the store
  // don't worry, that way it will be available in the client's initial store's state also
  if (process.server && req) {
    store.commit('authUser', req.session ? req.session.user : null);
  }
}
