<template>
  <div id="__CHN_APP">
    <!-- <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> |
      <router-link to="/demo">Demo</router-link>
    </div> -->
    <div class="main-content">
      <router-view/>
    </div>
  </div>
</template>

<style lang="stylus">
@import 'assets/css/layout.styl'
body
  background url('assets/img/choice_bg.jpg') no-repeat
  background-size 100% 100%
  background-attachment: fixed
#nav
  padding 30px
  a
    font-weight bold
    color #2c3e50
    &.router-link-exact-active
      color #42b983
</style>
