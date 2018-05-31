<template>
  <div class="page-content">

    <SealBaseDataFiltrate @filtrateChange="getDoubleCourseLevel" @reset="resetFiltrate"></SealBaseDataFiltrate>

    <!-- 数据列表 -->
    <div class="sealui-panel is-default">
      <div class="sealui-panel-heading">
        <h3 class="sealui-panel-title">展示列表</h3>
        <div class="panels-right" v-if="checkedAllList.length">
          <seal-button type="success" icon="files" @click="bindingAll">批量绑定</seal-button>
        </div>
      </div>
      <div class="sealui-panel-body" v-if="courselists.length">
        <div class="table-head">
          <seal-checkbox :indeterminate="isIndeterminate"  v-model="checkAll" @change="handleCheckedAllChange">班次名称</seal-checkbox>
          <span class="table-head--title">试卷绑定数量</span>
          <span class="table-head--title">操作</span>
        </div>
        <div class="table-body">
          <seal-checkbox-group v-model="checkedAllList" @change="handleCheckedListChange" >
            <ul>
              <li v-for="item in courselists">
                <seal-checkbox :name= "item.levelId" :label="item" :key="item.levelId">{{ item.levelName }}</seal-checkbox>
                <span class="table-head--title">{{paperCount ? paperCount : 0}}/30</span>
                <!-- <router-link :to="{path:'list',query:{id:1,d:schoolCode}}" class="binding-num"><i class="sealui-icon-editor"></i> 去绑定</router-link> -->
                <a href="javasvript:;" class="table-head--title" @click="bindingItem(item.levelId)"><i class="sealui-icon-editor"></i> 去绑定</a>
              </li>
            </ul>
          </seal-checkbox-group>
        </div>
      </div>
      <div class="sealui-panel-body" v-else>
        <div class="table-body">
          <p class="no-data-tip"><img src="@/assets/img/404.svg"><span>{{noDataMessage}}</span></p>
        </div>
      </div>
    </div>

    <!-- 分页 -->
    <seal-pagination layout="prev, pager, next" :total="total_num" v-if="courselists.length && total_num > pageSize" :page-size="pageSize" @current-change="handleCurrentChange" @size-change="handleCurrentChange"></seal-pagination>

    <!-- loading -->
    <div v-loading="loading" img="https://jiaoyanfz.aibeike.com/haibian/images/40@2x.png" text="让数据飞一会..." background="rgba(0,0,0,.15)" color="success"></div>

  </div>
</template>

<script>

import baseData from '@/mixins/baseData';
export default {
  name: 'Course',
  mixins : [ baseData ],
  data (){
    return {
      courselists     : [],         // 列表数据
      levelIds        : '',
      pageSize        : 10,         // 每页展示条数
      checkAll        : false,      // 是否全选
      isIndeterminate : true,       //
      checkedAllList  : [],         // 全选数据组
    }
  },
  mounted(){
    this.$nextTick().then(()=>{
      if(this.schoolCode && this.year && this.termId && this.gradeId && this.subjectId){
        this.getDoubleCourseLevel()
      }
    })

  },
  methods: {
    /**
     * 获取筛选后的数据
     * @param  {[type]} schoolCode [description]
     * @param  {[type]} year       [description]
     * @param  {[type]} termId     [description]
     * @param  {[type]} gradeId    [description]
     * @param  {[type]} subjectId  [description]
     * @param  {[type]} page       [description]
     * @return {[type]}            [description]
     * schoolCode,year,termId,gradeId,subjectId,page
     */
    getDoubleCourseLevel(page){
      this.loading = true
      this.$request({
        url:'chn/course/findDoubleCourseLevel',
        data : this.getBaseData({
          pageSize   : this.pageSize,
          pageNo     : page || 1
        })
      }).then((res) => {
        this.loading = false;
        if(res.status == 0 && res.result.totalCount > 0){
          this.courselists = res.result.rows
          this.total_num = res.result.totalCount
        }else{
          this.courselists = []
          this.total_num = 0
        }
      },(error) => {
        this.loading = false
        this.$message({
          type: 'error',
          message: '服务器返回错误'
        });
      })

    },

    // 分页事件
    handleCurrentChange(page){
      this.getDoubleCourseLevel(page)
    },

    // 全选事件
    handleCheckedAllChange(event) {
      this.checkedAllList = event.target.checked ? this.courselists : [];
      this.isIndeterminate = false;
    },
    // 单个选择
    handleCheckedListChange(value) {
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.courselists.length;
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.courselists.length;
    },
    // 页面跳转
    gotoCourseList(levelIds){
      this.$router.push({ path: 'courselist', query: {
        levelIds   : levelIds
      }})
    },
    // 绑定单个
    bindingItem(levelId){
      this.gotoCourseList(levelId)
      //this.gotoCourseList(this.schoolCode,this.termId,this.year,this.gradeId,this.subjectId,levelId)
    },
    // 绑定所有
    bindingAll(){
      let levelIds = [];
      for(let item in this.checkedAllList){
        levelIds.push(this.checkedAllList[item]['levelId'])
      }
      levelIds = levelIds.join(',')
      this.gotoCourseList(levelIds)
    },

    // 监听组件的重置筛选指令
    resetFiltrate(){
      this.courselists = [];
    }
  },


}
</script>
<style lang="stylus">


</style>
