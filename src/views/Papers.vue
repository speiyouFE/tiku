<template>
  <div class="page-content">
    <div class="sealui-panel folder-lists">
      <div class="sealui-panel-heading">
        <h2>{{ folder_name }}</h2>
      </div>
      <div class="sealui-panel-body">
        <div class="sealui-panel is-default">
          <div class="sealui-panel-heading">
            <h3 class="sealui-panel-title">&nbsp;</h3>
            <div class="panels-right">
              <seal-button type="success" icon="files" @click="createPaperModal(folder_id)">新建paper</seal-button>
            </div>
          </div>
          <div class="sealui-panel-body" v-if="paperLists.length > 0">
            <table class="table table-hover">
              <thead>
                <tr>
                  <th align="left" width="70%">Paper 名称</th>
                  <th align="left"></th>
                </tr>
              </thead>
              <tbody>

                <tr v-for="item in paperLists" :key="item.paperId">
                  <td align="left">{{ item.name }}</td>
                  <td align="right">
                    <seal-button type="warning" icon="edit" @click="editPaper(folder_id,item.paperId)">编辑 paper</seal-button>
                    <seal-button type="danger" icon="delete" @click="delPaperModal(folder_id,item.paperId)">删除 paper</seal-button>
                  </td>
                </tr>

              </tbody>
            </table>
          </div>
          <div class="sealui-panel-body" v-else>
            <p class="no-data-tip"><img src="@/assets/img/404.svg"><span>{{noDataMessage}}</span></p>
          </div>
        </div>
      </div>
    </div>
    <!-- loading -->
    <div v-loading="loading" img="https://jiaoyanfz.aibeike.com/haibian/images/40@2x.png" text="让数据飞一会..." background="rgba(0,0,0,.15)" color="success"></div>
  </div>
</template>

<script>
  import baseData from '@/mixins/baseData';
  export default {
    name: 'PaperList',
    mixins : [ baseData ],
    data (){
      return {
        folder_id    : this.$route.query.folder_id,
        folder_name  : this.$route.query.folder_name,
        subject_id   : this.$route.query.subjectId,
        grade_id     : this.$route.query.gradeId,
        paperLists   : [],
        editPaperUrl : null,
      }
    },
    created(){

    },
    mounted(){
      this.$nextTick().then(()=>{
        this.getPaperLists(this.folder_id)
      })
    },
    methods:{
      /**
       * 获取文件夹下的 paper list
       * @param  {[type]} folderID [description]
       * @return {[type]}          [description]
       */
      getPaperLists(folderID){
        if(!folderID) return false;
        this.loading = true
        this.$request({
          url:`paperFolders/${folderID}/papers`
        }).then((res) => {
          this.loading = false;
          if(res.status == 0 && res.result.length>0){
            this.paperLists = res.result
          }else{
            this.paperLists = []
          }
        },(error) => {
          this.loading = false
          this.$message({
            type: 'error',
            message: '服务器返回错误'
          });
        })
      },

      /**
       * 创建 paper Modal
       * @return {[type]} [description]
       */
      createPaperModal(folderID){
        this.$prompt('请输入新建 Paper 名称', '请输入新建paper名称', {
          closeOnClickModal : false,
          showClose         : false,
          customClass       : 'create-paper-modal',
          confirmButtonText : '创 建',
          cancelButtonText  : '取 消',
          inputPlaceholder  : '请输入新建paper名称',
          inputPattern      : /^[\u4e00-\u9fa5A-Za-z0-9-_]*$/,
          inputErrorMessage : 'paper名称不能为空且不包含特殊符号'
        }).then(({ value }) => {
          this.savePaperToServer(folderID,value)
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消创建 Paper'
          });
        });
      },

      /**
       * 保存paper
       * @return {[type]} [description]
       */
      savePaperToServer(folderID,folderName){
        if(!folderID && !folderName) return false;
        this.loading = true
        this.$request({
          url:`paperFolders/${folderID}/papers`,
          method : 'POST',
          data : {
            name      : folderName,
            subjectId : this.subject_id || '',
            gradeId   : this.grade_id || '',
            userId    : sessionStorage.getItem('userId'),
            userName  : sessionStorage.getItem('userName')
          }
        }).then((res) => {
          this.loading = false;
          if(res.status == 0){
            this.$message({
              type: 'success',
              message: '创建成功'
            });
            // 创建成功后，重新获取paper列表数据
            this.getPaperLists(folderID)
          }else{
            this.$message({
              type: 'warning',
              message: res.message
            });
          }
        },(error) => {
          this.loading = false
          this.$message({
            type: 'error',
            message: '服务器返回错误'
          });
        })
      },

      /**
       * 删除 paper Modal
       * @param  {[type]} paperID [description]
       * @return {[type]}         [description]
       */
      delPaperModal(folderID,paperID){
        this.$confirm('此操作将永久删除该paper, 是否继续?', '系统提示', {
          confirmButtonText: '删吧，不管了',
          cancelButtonText: '让我再考虑一下',
          closeOnClickModal : false,
          showClose         : false,
          type: 'warning'
        }).then(() => {
          this.delPaperToServer(folderID,paperID)
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },

      /**
       * 删除paper
       * @return {[type]} [description]
       */
      delPaperToServer (folderID,paperID){
        if(!folderID && !folderName) return false;
        this.loading = true
        this.$request({
          url:`paperFolders/${folderID}/papers/${paperID}`,
          method : 'DELETE'
        }).then((res) => {
          this.loading = false;
          if(res.status == 0){
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
            // 删除成功后，重新获取paper列表数据
            this.getPaperLists(folderID)
          }else{
            this.$message({
              type: 'error',
              message: res.message
            });
          }
        },(error) => {
          this.loading = false
          this.$message({
            type: 'error',
            message: '服务器返回错误'
          });
        })
      },

      editPaper(folderID,paperID){
        if(!folderID && !folderName) return false;
        this.$request({
          url:`paperFolders/${folderID}/papers/${paperID}`,
          data:{
            userId : sessionStorage.getItem('userId'),
            userName : sessionStorage.getItem('userName')
          }
        }).then((res) => {
          if(res.status == 0){
            window.open(res.result,"_blank");
            //this.editPaperUrl = res.result
            //window.location.href=res.result
          }else{

          }
        },(error) => {
          this.$message({
            type: 'error',
            message: '服务器返回错误'
          });
        })
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .table{
    border 0 none
  }
  .folder-lists
    box-shadow 0 0 0 0
    border 0 none
    > .sealui-panel-heading
      border 1px solid #20a0ff
      border-bottom 0 none
      background #ecf6fd
  .sealui-panel-body .sealui-panel-heading,
  .sealui-panel-body .sealui-panel
      border-radius 0

</style>
