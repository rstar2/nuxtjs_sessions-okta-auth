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
      <nuxt-link v-if="!$store.getters.isAuth" class="navbar-item mr-5" to="/auth/register">Register</nuxt-link>
      <nuxt-link v-if="!$store.getters.isAuth" class="navbar-item" to="/auth/login">Log In</nuxt-link>
      <LogoutForm v-if="$store.getters.isAuth" class="navbar-item" action="/auth/logout" name="Logout" />
    </v-app-bar>
    <v-content>
      <v-container>
        <Notification v-if="notification" :message="notification" />
        <nuxt />
      </v-container>
    </v-content>
    <v-footer fixed app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
import Notification from '@/components/Notification.vue';
import LogoutForm from '@/components/LogoutForm.vue';

export default {
  components: {
    Notification,
    LogoutForm
  },
  data() {
    const items = [
      {
        icon: 'mdi-apps',
        title: 'Welcome',
        to: '/'
      }
    ];
    // if (this.$store.getters.isAuth) {
    items.push({
      icon: 'mdi-chart-bubble',
      title: 'Profile',
      to: '/auth/profile'
    });
    // }
    // if (this.$store.getters.isAdmin) {
    items.push({
      icon: 'mdi-chart-bubble',
      title: 'Admin Dashboard',
      to: '/admin/dashboard'
    });
    // }

    items.push({
      icon: 'mdi-chart-bubble',
      title: 'Not Auth Only',
      to: '/not-auth-only'
    });
    return {
      drawer: false,
      items,
      title: 'Sessions-okta-auth'
    };
  },
  computed: {
    notification() {
      return this.$store.state.notification;
    }
  },
  methods: {}
};
</script>
