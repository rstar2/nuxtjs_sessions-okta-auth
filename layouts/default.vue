<template>
  <v-app dark>
    <v-navigation-drawer v-model="drawer" temporary fixed app>
      <v-list>
        <v-list-item v-for="(item, i) in items" :key="i" :to="item.to" router exact>
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar fixed app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title v-text="title" />
      <v-spacer />
      <nuxt-link class="navbar-item mr-5" to="/auth/register">Register</nuxt-link>
      <nuxt-link class="navbar-item" to="/auth/login">Log In</nuxt-link>
    </v-app-bar>
    <v-content>
      <v-container>
        <nuxt />
      </v-container>
    </v-content>
    <v-footer fixed app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data() {
    const items = [
      {
        icon: 'mdi-apps',
        title: 'Welcome',
        to: '/'
      }
    ];
    if (this.$store.isAuth) {
      items.push({
        icon: 'mdi-chart-bubble',
        title: 'Profile',
        to: '/auth/profile'
      });
    }
    if (this.$store.isAdmin) {
      items.push({
        icon: 'mdi-chart-bubble',
        title: 'Admin Dashboard',
        to: '/admin/dashboard'
      });
    }
    return {
      drawer: false,
      items,
      title: 'Vuetify.js'
    };
  }
};
</script>
