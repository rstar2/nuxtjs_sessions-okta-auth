<template>
  <v-layout>
    <v-flex class="text-center">
      <img src="/v.png" alt="Vuetify.js" class="mb-5" />
      <em>&mdash;Profile</em>
    </v-flex>
  </v-layout>
</template>

<script>
import { NEED_AUTH } from '@/lib/AuthMode.js';

export default {
  // The 'meta' prop will define the route meta data like in VueRouter
  meta: {
    authMode: NEED_AUTH
  }
};
</script>
