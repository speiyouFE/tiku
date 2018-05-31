<template>
  <div class="page-content">
    <SealBaseDataFiltrate @filtrateChange="getPaperFoldersList" @reset="resetFiltrate"></SealBaseDataFiltrate>
    <!-- 数据列表 -->
    <div class="sealui-panel is-default">
      <div class="sealui-panel-heading">
        <h3 class="sealui-panel-title">文件夹列表</h3>
        <div class="panels-right">
          <seal-button type="success" icon="plus" @click="createFolder">创建文件夹</seal-button>
        </div>
      </div>
      <div class="sealui-panel-body">
        <table class="table table-hover">
          <thead>
            <tr>
              <th align="left">文件夹名称</th>
              <th align="left" width="50%">paper数量</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in folderslists" :key="item.id">
              <td><router-link :to="{path:'paperlist',query:{folder_id:item.id,gradeId:item.gradeId,subjectId:item.subjectId,folder_name:item.name}}">{{item.name}}</router-link></td>
              <td>{{item.paperCount}}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- 创建文件夹弹层 -->
    <seal-dialog
      title="提示"
      width="70%"
      custom-class="createFolder"
      :show-close="false"
      :close-on-click-modal="false"
      :visible.sync="createFolderDialogVisible"
      >
      <div slot="title" class="dialog-header">新建文件夹</div>
      <SealBaseDataFiltrate @reset="resetFiltrate"></SealBaseDataFiltrate>
      名称：
      <seal-input v-model="folderName" placeholder="例如：北京2018年秋季 三年级 尖子班"></seal-input>
      <div slot="footer" class="dialog-footer">
        <seal-button @click="createFolderDialogVisible = false">取 消</seal-button>
        <seal-button type="primary" @click="saveFolder">确 定</seal-button>
      </div>
    </seal-dialog>
  </div>
</template>

<script>
  import baseData from '@/mixins/baseData';
  import cityList from '../cityList'
  export default {
    name : 'Folders',
    mixins : [ baseData ],
    data(){
      return {
        createFolderDialogVisible : false,
        folderName : '',
        folderslists : []
      }
    },
    filters:{
      transformCityCodeToCityName (citycode){
        for(let item in cityList){
          if(cityList[item]['id'] == citycode){
            return cityList[item]['name']
          }
        }
      }
    },
    created(){

    },
    mounted(){
      let _self = this
      this.$nextTick().then(()=>{
        this.getPaperFoldersList()
      })
    },
    methods:{
      getPaperFoldersList(page){
        this.loading = true
        this.$request({
          url:'paperFolders/list',
          data:this.getBaseData()
        }).then((res) => {
          this.loading = false;
          if(res.status == 0 && res.result.length > 0){
            this.folderslists = res.result
          }else{
            this.folderslists = []
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
       * 创建文件夹
       * @return {[type]} [description]
       */
      createFolder(){
        this.createFolderDialogVisible = true
      },

      /**
       * 保存文件夹
       * @return {[type]} [description]
       */
      saveFolder(){
        let params = this.getBaseData({
          name   : this.folderName
        });
        if(!params.schoolCode || !params.year ||!params.termId|| !params.gradeId || !params.subjectId){
          this.$message({
            type: 'warning',
            message: '请先筛选条件'
          })
          return false;
        }
        if(!params.name){
          this.$message({
            type: 'warning',
            message: '文件夹名称不能为空'
          })
          return false;
        }
        this.$request({
          url    :'paperFolders',
          method : 'POST',
          data   : this.getBaseData({
            name   : this.folderName
          })
        }).then((res) => {
          if(res.status == 0){
            sessionStorage.clear()
            this.getPaperFoldersList()
            this.$message({
              type: 'success',
              message: '文件夹创建成功'
            })
          }else{
            this.$message({
              type: 'error',
              message: '文件夹创建失败'
            })
          }
        },(error) => {
          this.loading = false
          this.$message({
            type: 'error',
            message: '服务器返回错误'
          })
        })
        this.createFolderDialogVisible = false
      },

      resetFiltrate(){
        this.getPaperFoldersList()
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .table
    td
      padding 10px 12px
    a
      display block
</style>
