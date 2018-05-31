<template>
  <div class="page-content">
    <p>亲，你能告诉我，你想干嘛吗？</p>
    <div class="blankslate-content">
      <div class="blankslate">
        <img src="@/assets/img/defaultPortrait.png" />
        <router-link to="/paperfolder" class="sealui-button is-success"><i class="sealui-icon-double-left" style="margin-right: 10px"></i> 左拐 创建Paper</router-link>
      </div>
      <div class="blankslate">
        <img src="@/assets/img/defaultPortrait.png" />
        <router-link to="/papercourse" class="sealui-button is-success">右拐 绑定Paper <i class="sealui-icon-double-right"style="margin-left: 10px"></i></router-link>
      </div>
    </div>
  </div>
</template>
<style lang="stylus" scoped>
  .page-content
    text-align center
    background #fff
    margin 0 auto
    font-size 20px
    border-radius 6px
    border 1px solid #e2f7a8
    padding 50px 30px 30px 30px
    top 50%
    left 50%
    transform:translate(-50%,-50%);
    transform-origin:50% 50%;
    position: absolute;
    box-shadow: 0px 0px 50px #309eac
  .blankslate-content
    display flex
    padding 50px 0
  .blankslate
    flex 1
    text-align center
  img
    display block
    margin 0px auto 30px auto
  .sealui-button
    font-size 1em
    margin 0 20px
</style>
