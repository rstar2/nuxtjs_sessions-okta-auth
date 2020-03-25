<template>
  <v-alert type="error"> {{ message }} </v-alert>
</template>

<script>
export default {
  props: {
    message: {
      type: String,
      default: null
    }
  },
  methods: {
    clear() {}
  }
};
</script>
