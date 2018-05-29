<template>
  <div class="page-content">
    <div class="sealui-panel is-default">
      <div class="sealui-panel-heading">
        <h3 class="sealui-panel-title">北京诊断类大班数学</h3>
      </div>
      <div class="sealui-panel-body">
        <table class="table table-hover">
          <thead>
            <tr>
              <th align="left">课次</th>
              <th align="left" width="70%">讲义名称</th>
              <th align="center">操作人</th>
              <th align="center">操作时间</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td align="left">第1课</td>
              <td align="left" width="60%">
                <seal-tag theme="success" :closable="true" @close="handleCloseTag(tags,tag)">北京诊断类大班数学</seal-tag>
                <seal-tag theme="success" :closable="true" @close="handleCloseTag(tags,tag)">北京诊断类大班数学</seal-tag>
               <seal-tag theme="success" :closable="true" @close="handleCloseTag(tags,tag)">北京诊断类大班数学</seal-tag>
                <seal-tag theme="warning" :closable="true" @close="handleCloseTag(tags,tag)">北京诊断类大班数学</seal-tag>
                 <seal-tag theme="warning" :closable="true" @close="handleCloseTag(tags,tag)">北京诊断类大班数学</seal-tag>
                <seal-tag theme="warning" :closable="true" @close="handleCloseTag(tags,tag)">北京诊断类大班数学</seal-tag>
                 <seal-tag theme="primary" :closable="true" @close="handleCloseTag(tags,tag)">北京诊断类大班数学</seal-tag>
                <seal-tag theme="primary" :closable="true" @close="handleCloseTag(tags,tag)">北京诊断类大班数学</seal-tag>
                 <seal-tag theme="primary" :closable="true" @close="handleCloseTag(tags,tag)">北京诊断类大班数学</seal-tag>
                <seal-tag theme="primary" :closable="true" @close="handleCloseTag(tags,tag)">北京诊断类大班数学</seal-tag>
              </td>
              <td align="left">听着情歌流泪</td>
              <td align="right">2018-05-23 18:55:52</td>
            </tr>
            <tr>
              <td align="left">第2课</td>
              <td align="left" width="60%">
                <seal-tag theme="primary" :closable="true" @close="handleCloseTag(tags,tag)">北京诊断类大班数学</seal-tag>
              </td>
              <td align="left">听着情歌流泪</td>
              <td align="right">2018-05-23 18:55:52</td>
            </tr>
            <tr>
              <td align="left">第3课</td>
              <td align="left" width="60%">
                <seal-button :plain="true" type="primary" size="small">添加讲义</seal-button>
              </td>
              <td align="left">听着情歌流泪</td>
              <td align="right">2018-05-23 18:55:52</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- loading -->
    <div v-loading="loading" img="https://jiaoyanfz.aibeike.com/haibian/images/40@2x.png" text="稍等片刻..." background="rgba(0,0,0,.15)" color="success"></div>

  </div>
</template>

<script>
  export default {
    name: 'PaperList',
    data (){
      return {
        loading : true,
        query : this.$route.query
      }
    },
    created(){

    },
    mounted(){
      let _self = this
      this.$nextTick().then(function () {
        _self.getPapers()
      })
    },
    methods:{
      delAction(callback){
        this.$confirm('此操作将解绑现有讲义, 是否继续?', '系统提示', {
          confirmButtonText: '解绑吧',
          cancelButtonText: '等等，考虑一下',
          type: 'warning',
          closeOnClickModal:false
        }).then(() => {
          callback()
          // this.$message({
          //   type: 'success',
          //   message: '删除成功!'
          // });
        }).catch(() => {
          // this.$message({
          //   type: 'info',
          //   message: '已取消删除'
          // });
        });
      },
      /**
       * 获取 paper 列表
       * @return {[type]} [description]
       */
      getPapers(){
        this.$request({
          url:'/class/papers',
          data:this.query
        }).then((res) => {
          console.log(res)
          setTimeout(()=>{
            this.loading = false
          },300)
        },(error) => {
          this.loading = false
          this.$message({
            type: 'error',
            message: '服务器超时'
          });
          console.log(error.message)
        })
      },

      // 取消绑定讲义
      handleCloseTag(tags,tag){
        let _self = this;
        this.delAction(function(){
          _self.$message({
            duration:3000,
            type: 'success',
            message: '解绑成功!'
          });
        })
        //tags.splice(tags.indexOf(tag), 1);
      }
    }
  }
</script>
<style lang="stylus" scoped>
.sealui-tag
  margin 2px 5px 2px 0
.table > thead > tr > th {
  background: rgba(32,160,255,.1);
}
</style>
