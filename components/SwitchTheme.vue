<template>
  <span>
    <v-btn icon @click="switchDarkMode">
      <Icon size="x-small" icon="mdi-white-balance-sunny" />
    </v-btn>
  </span>
</template>
<script>
export default {
  methods: {
    switchDarkMode() {
      this.$vuetify.theme.isDark = !this.$vuetify.theme.isDark;
    },
  },
};
</script>
