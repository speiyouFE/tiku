<template>
  <div class="page-content">
    <div class="sealui-panel is-default">
      <div class="sealui-panel-heading">
        <h3 class="sealui-panel-title">北京诊断类大班数学</h3>
        <div class="panels-right">

        </div>
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
            <tr v-for="i in 30">
              <td align="left">第{{i}}课</td>
              <td align="left" width="60%">
                <!-- <seal-tag theme="success" :closable="true" @close="handleCloseTag(tags,tag)">北京诊断类大班数学</seal-tag> -->
                <seal-button size="small" type="info" @click="createAddPaperDialog(i)">添加讲义</seal-button>
              </td>
              <td align="center">听着情歌流泪</td>
              <td align="center">2018-05-23 18:55:52</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>


    <!-- 创建文件夹弹层 -->
    <seal-dialog
      width="800px"
      custom-class="createAddPaperDialog"
      :show-close="paperId ? false : true"
      :close-on-click-modal="false"
      :visible.sync="createAddPaperDialogVisible"
      >
      <div slot="title" class="dialog-header">添加讲义(第{{classNum}}课)</div>
      <div class="paperDialog-select">
        <seal-select v-model="schoolCode" size="small" placeholder="城市" @change="handleSelectChange('schoolCode',schoolCode)">
          <seal-option
            v-for="item in cityList"
            :label="item.name"
            :value="item.id"
            :key="item.id">
          </seal-option>
        </seal-select>
        <seal-select v-model="year" size="small" placeholder="年份" @change="handleSelectChange('year',year)">
          <seal-option label="2017" value="2017"></seal-option>
          <seal-option label="2018" value="2018"></seal-option>
          <seal-option label="2019" value="2019"></seal-option>
          <seal-option label="2020" value="2020"></seal-option>
        </seal-select>
        <seal-select v-model="gradeId" size="small" placeholder="年级" @change="handleSelectChange('grade',gradeId)">
          <seal-option
            v-for="item in gradeLists"
            :label="item.name"
            :value="item.id"
            :key="item.id">
          </seal-option>
        </seal-select>
        <seal-select v-model="subjectId" size="small" placeholder="学科" @change="handleSelectChange('subject',subjectId)" disabled>
          <seal-option label="语文" value="ff80808127d77caa0127d7e13be500c6"></seal-option>
        </seal-select>
        <seal-select v-model="termId" size="small" placeholder="学期" @change="handleSelectChange('term',termId)">
          <seal-option
            v-for="item in termLists"
            :label="item.name"
            :value="item.id"
            :key="item.id">
          </seal-option>
        </seal-select>
      </div>
      <div class="folderslists-content">
        <div class="folder-cont">
          <div class="folder-title">文件夹</div>
          <div class="folder-list">
            <ul v-if="folderslists.length > 0">
              <li v-for="item in folderslists" @click="getPapersByFolder(item.id)">
                <span class="folder-name">{{item.name}}</span>
                <i class="sealui-icon-arrow-right"></i>
              </li>
            </ul>
            <p class="no-data-tip" v-else><img src="@/assets/img/404.svg"><span>{{noDataMessage}}</span></p>
          </div>
        </div>
        <div class="folder-cont">
          <div class="folder-title">Paper 名称</div>
          <div class="paper-list">
            <ul v-if="paperLists.length > 0">
              <li v-for="item in paperLists">
                <span class="folder-name" @click="selectPaper(item.paperId)">{{item.name}}</span>
              </li>
            </ul>
            <p class="no-data-tip" v-else><img src="@/assets/img/404.svg"><span>{{noDataMessage}}</span></p>
          </div>
        </div>
      </div>
      <div slot="footer" class="dialog-footer" v-if="paperId">
        <seal-button @click="createAddPaperDialogVisible = false">取 消</seal-button>
        <seal-button type="primary" @click="bindPaper">确 定</seal-button>
      </div>
    </seal-dialog>
    <!-- loading -->
    <div v-loading="loading" img="https://jiaoyanfz.aibeike.com/haibian/images/40@2x.png" text="稍等片刻..." background="rgba(0,0,0,.15)" color="success"></div>

  </div>
</template>

<script>
  import {addClass,removeClass,hasClass} from '@/utils/dom'
  import cityList from '../cityList'
  import baseData from '@/mixins/baseData';
  export default {
    name: 'PaperList',
    mixins : [ baseData ],
    data (){
      return {
        cityList,
        gradeLists                  : JSON.parse(localStorage.getItem('gradeLists')) || [],
        termLists                   : JSON.parse(localStorage.getItem('termLists')) || [],
        subjectLists                : JSON.parse(localStorage.getItem('subjectLists')) || [],
        createAddPaperDialogVisible : false,

        folderslists : [],
        paperLists : [],
        paperId : null,
        levelIds : this.$route.query.levelIds
      }
    },
    created(){
      //console.log(this.termId)
    },
    mounted(){
      this.$nextTick().then(()=>{
        this.getPaperFoldersList()
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
      // /**
      //  * 获取 paper 列表
      //  * @return {[type]} [description]
      //  */
      // getPapers(levelIds){
      //   this.$request({
      //     url:'/class/papers',
      //     data:this.getBaseData({
      //       levelIds :levelIds
      //     })
      //   }).then((res) => {
      //     console.log(res)
      //     this.loading = false
      //   },(error) => {
      //     this.loading = false
      //     this.$message({
      //       type: 'error',
      //       message: '服务器超时'
      //     });
      //     console.log(error.message)
      //   })
      // },

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
      },

      /**
       * 创建绑定讲义弹层
       * @return {[type]} [description]
       */
      createAddPaperDialog(i){
        this.classNum = i
        this.createAddPaperDialogVisible = true
      },

      /**
       * 下拉框操作事件
       * @param  {[type]} type  [description]
       * @param  {[type]} value [description]
       * @return {[type]}       [description]
       */
      handleSelectChange(type,value){
        switch(type){
          case 'schoolCode':
            this.schoolCode = value
          break;
          case 'year':
            this.year = value
          break;
          case 'grade':
            this.gradeId = value
          break;
          case 'subject':
            this.subjectId = value
          break;
          case 'term':
            this.termId = value
          break;
        }
        this.getPaperFoldersList()
      },

      /**
       * 获取文件夹列表
       * @param  {[type]} page [description]
       * @return {[type]}      [description]
       */
      getPaperFoldersList(){
        this.loading = true
        this.$request({
          url:'paperFolders/list',
          data:{
            schoolCode      : this.schoolCode,
            year            : this.year,
            termId          : this.termId,
            gradeId         : this.gradeId,
            subjectId       : 'ff80808127d77caa0127d7e13be500c6',
          }
        }).then((res) => {
          this.loading = false;
          if(res.status == 0 && res.result.length > 0){
            this.folderslists = res.result
          }else{
            this.folderslists = [];
            this.paperLists = []
            this.paperId = null
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
       * 根据选中的文件夹获取相应的paper
       * @param  {[type]} folderID [description]
       * @return {[type]}          [description]
       */
      getPapersByFolder(folderID){
        if(!folderID) return false;
        for(let i = 0; i<=event.path[2].children.length;i++){
          removeClass(event.path[2].children[i],'active')
        }
        addClass(event.target.parentNode,'active')
        this.loading = true
        this.$request({
          url:`paperFolders/${folderID}/papers`
        }).then((res) => {
          this.loading = false;
          if(res.status == 0 && res.result.length>0){
            this.paperLists = res.result
          }else{
            this.paperId = null;
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
       * 选中paper
       * @return {[type]} [description]
       */
      selectPaper(paperID){
        for(let i = 0; i<=event.path[2].children.length;i++){
          removeClass(event.path[2].children[i],'active')
        }
        addClass(event.target.parentNode,'active')
        if(paperID) this.paperId = paperID
      },

      bindPaper(){
        this.loading = true
        this.$request({
          url:`class/bindPaper`,
          method:'POST',
          data:{
            schoolCode : this.schoolCode,
            year       : this.year,
            termId     : this.termId,
            gradeId    : this.gradeId,
            subjectId  : 'ff80808127d77caa0127d7e13be500c6',
            paperId    : this.paperId,
            cnum       : this.classNum,
            levelIdStr : this.levelIds
          }
        }).then((res) => {
          this.loading = false;
          if(res.status == 0){
            this.$message({
              type: 'success',
              message: '添加讲义成功'
            });
            this.createAddPaperDialogVisible = false
            sessionStorage.clear()
          }
        },(error) => {
          this.loading = false
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
.sealui-tag
  margin 2px 5px 2px 0
.table > thead > tr > th {
  background: rgba(32,160,255,.1);
}
</style>
