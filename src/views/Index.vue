<template>
  <div class="page-content">
    <p>亲，你能告诉我，你想干嘛吗？</p>
    <div class="blankslate-content">
      <div class="blankslate">
        <router-link to="/paperfolder">创建 Paper</router-link>
      </div>
      <div class="blankslate">
        <router-link to="/papercourse">绑定 Paper</router-link>
      </div>
    </div>
  </div>
</template>
<style lang="stylus" scoped>
  .page-content
    text-align center
    background #f0f2f5
    width 500px
    margin 0 auto
    font-size 30px
    border-radius 3px
    border 1px solid #e9e9e9
    padding 30px
    top 30%
    left 50%
    transform: translateX(-50%);
    position: absolute;
  .blankslate-content
    display flex
    padding 50px 0
  .blankslate
    flex 1
</style>
