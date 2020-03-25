<template>
  <v-form ref="form" method="POST" :action="action">
    <v-btn @click="submit"> {{ name }}</v-btn>
  </v-form>
</template>

<script>
export default {
  props: {
    action: {
      type: String,
      required: true
    },
    name: {
      type: String,
      default: 'Logout'
    }
  },
  methods: {
    submit() {
      this.$refs.form.$el.submit();
    }
  }
};
</script>
