<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  beforeCreate(){
    document.querySelector('body').setAttribute('style', 'margin:0;')
  },
}
</script>

<style lang="scss">
#app{
  height: 100vh;
}
</style>
