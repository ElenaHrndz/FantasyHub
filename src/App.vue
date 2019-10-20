<template>
<div id="app">
  <router-view />
</div>
</template>

<script>
export default {
  name: 'app',
  components: {}
}
</script>

<style>
#app {
  font-family: 'Nunito', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #6c8494;
  margin: 0px;
}

body {
  margin: 0;
  padding: 0;
}

a {
  text-decoration: none;
  color: #6c8494;
}
</style>
