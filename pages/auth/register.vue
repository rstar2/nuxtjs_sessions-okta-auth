<template>
  <v-form ref="form" v-model="valid" method="POST">
    <v-text-field v-model="name" name="name" :counter="10" :rules="nameRules" label="Name" required></v-text-field>

    <v-text-field v-model="password" name="password" :rules="passwordRules" label="Password" required></v-text-field>

    <v-btn color="default" class="mt-5" :disabled="!valid" @click="submit">Register</v-btn>
  </v-form>
</template>

<script>
export default {
  data: () => ({
    valid: false,

    name: '',
    password: '',

    nameRules: [
      (v) => !!v || 'Name is required',
      (v) => (v && v.length <= 10) || 'Name must be less than 10 characters'
    ],
    passwordRules: [
      (v) => !!v || 'Password is required',
      (v) => (v && v.length >= 6) || 'Name must more than 6 characters'
    ]
  }),

  methods: {
    submit() {
      if (this.$refs.form.validate()) {
        this.$refs.form.$el.submit();
      }
    }
  }
};
</script>
