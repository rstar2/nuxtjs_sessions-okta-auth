const consola = require('consola');

// NOTE: The exported 'state' has to be a function that returns the state object
// to avoid unwanted shared state on the server side.
export const state = () => {
  return {
    // the authenticated user,
    /* User */ authUser: null,

    /* -------------------------------------- */

    // protected data
    /* Array */ data: [],

    /**
     * @type {String}
     */
    notification: null
  };
};

export const getters = {
  /**
   * @return {Boolean}
   */
  isAuth(state) {
    return !!state.authUser;
  },
  /**
   * @return {Boolean}
   */
  isAdmin(state) {
    return !!state.authUser && state.authUser.claims && !!state.authUser.claims.admin;
  },
  /**
   * @return {Number|null}
   */
  authUid(state) {
    return !!state.authUser && state.authUser.uid;
  },
  /**
   * @return {():Boolean}
   */
  checkAuthUser(state, getters) {
    // 1. getters receive other getters as second argument
    // 2. return as a function, so it can be used like this from a VM:
    // this.$store.getters.checkAuthUser("asd")
    return (uid) => {
      const authUid = getters.authUid;
      return authUid && authUid === uid;
    };
  },

  /**
   * @return {Array}
   */
  protectedData(state) {
    return state.data;
  }
};
/**
 * In order to access the Vuex.Store instance as 'this' inside a mutation function
 * it should not be declared using arrow-function.
 *
 * So if any plugin injects something like 'inject('auth',...)'
 * it wil be accessible with 'this.$auth'.
 *
 * NOTE: If 'this' is not explicitly accessed in the mutation function
 * then in ChromeDevTools it will be shown as undefined
 */
export const mutations = {
  /**
   * @param {*} state
   * @param {{is:Number, email:String}|null} user user instance
   */
  authUser(state, user) {
    state.authUser = user;
  },

  data(state, data = []) {
    state.data = data;
  },

  /**
   * @param {*} state
   * @param {String} [message]
   */
  notification(state, message) {
    state.notification = message;
  }
};

/**
 * In order to access the Vuex.Store instance as 'this' inside an action function
 * it should not be declared using arrow-function.
 *
 * So if any plugin injects something like 'inject('auth',...)'
 * it wil be accessible with 'this.$auth'.
 *
 * NOTE: If 'this' is not explicitly accessed in the action function
 * then in ChromeDevTools it will be shown as undefined.
 */
export const actions = {
  /* async */ nuxtServerInit({ dispatch, commit }, { req }) {
    consola.warn('Store - nuxtServerInit');

    const session = req.session;

    const user = session ? session.user : null;

    commit('authUser', user);
  },

  /**
   * Login action
   * @param {Vuex.ActionContext} context
   * @param {{email:String, password: String}} payload
   * @return {Promise}
   */
  login(context, payload) {
    return this.$auth.login(payload);
  },

  /**
   * Login with Google action
   * @param {Vuex.ActionContext} context
   * @return {Promise}
   */
  loginWithGoogle(context) {
    return this.$auth.loginWithGoogle();
  },

  /**
   * Register action
   * @param {Vuex.ActionContext} context
   * @param {{name:String, email:String, password: String}} payload
   * @return {Promise}
   */
  register(context, payload) {
    return this.$auth.register(payload);
  },

  /**
   * Logout action
   * @return {Promise}
   */
  logout() {
    return this.$auth.logout();
  }
};
