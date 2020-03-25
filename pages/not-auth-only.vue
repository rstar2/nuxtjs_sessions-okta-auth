<template>
  <v-layout>
    <v-flex class="text-center">
      <img src="/v.png" alt="Vuetify.js" class="mb-5" />
      <blockquote class="blockquote">
        &#8220;First, solve the problem. Then, write the code.&#8221;
        <footer>
          <small>
            <em>&mdash;John Johnson</em>
          </small>
        </footer>
      </blockquote>
    </v-flex>
  </v-layout>
</template>

<script>
import { NEED_NO_AUTH } from '@/lib/AuthMode.js';

export default {
  // The 'meta' prop will define the route meta data like in VueRouter
  meta: {
    authMode: NEED_NO_AUTH
  }
};
</script>
