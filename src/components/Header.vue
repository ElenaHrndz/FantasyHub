<template>
<div class="header">
  <div class="el-row is-justify-space-between is-align-middle animated el-row--flex animated--visible fadeInUp offsetted">
    <div><a href="/"><img class="logo" src="../assets/images/FantasyHub.png" alt="FantasyHub"></a></div>
    <div class="menu-toggle animated animated--visible fadeInUp offsetted"><img src="../assets/images/Hamburguer_background.svg"></div>
  </div>
</div>
</template>

<script>
import BaseLayout from '@/layouts/BaseLayout.vue'

export default {
  name: 'Header',
  data() {
    return {}
  },
  mounted() {

  },
  methods: {

  },
  components: {}
}
</script>

<style lang="scss" scoped>
@import "~/assets/scss/element-variables.scss";

.logo{
  width: 80%;
}

</style>
