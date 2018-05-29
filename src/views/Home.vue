<template>
  <div class="page-content">

    <!-- 数据筛选 -->
    <div class="sealui-panel is-default">
      <div class="sealui-panel-heading">
        <h3 class="sealui-panel-title">属性筛选</h3>
        <div class="panels-right">
          <seal-button-group>
            <seal-button type="success" icon="morning" @click="resetFiltrate">重 置</seal-button>
            <seal-button type="success" :icon="iconClass" @click="isOpenFold = !isOpenFold">{{isOpenFold ? '折 叠' : '展 开'}}</seal-button>
          </seal-button-group>
        </div>
      </div>
      <div class="groupList">
        <ul class="list-group">
          <li class="list-group-item">
            <label class="label-title">城市：</label>
            <seal-radio-group v-model="schoolCode" @on-change="handleCheckedCitiesChange">
              <seal-radio-button v-for="item in cityList" :label="item.id" :key="item.id">{{item.name}}</seal-radio-button>
            </seal-radio-group>
          </li>
          <li class="list-group-item">
            <label class="label-title">年份：</label>
            <seal-radio-group v-model="year" type="info" @on-change="handleCheckedCourseTypesChange">
              <seal-radio-button label="2020"></seal-radio-button>
              <seal-radio-button label="2019"></seal-radio-button>
              <seal-radio-button label="2018"></seal-radio-button>
              <seal-radio-button label="2017"></seal-radio-button>
            </seal-radio-group>
          </li>
          <li class="list-group-item">
            <label class="label-title">学期：</label>
            <seal-radio-group v-model="termId" type="success"  @on-change="handleCheckedPhaseChange">
              <seal-radio-button v-for="item in terms" :label="item.id" :key="item.id">{{ item.name }}</seal-radio-button>
            </seal-radio-group>
          </li>
          <li class="list-group-item">
            <label class="label-title">年级：</label>
            <seal-radio-group v-model="gradeId"  type="dark"  @on-change="handleCheckedGradesChange">
              <seal-radio-button v-for="item in grades" :label="item.id" :key="item.id">{{ item.name }}</seal-radio-button>
            </seal-radio-group>
          </li>
          <li class="list-group-item">
            <label class="label-title">学科：</label>
            <seal-radio-group v-model="subjectId" type="danger"  @on-change="handleCheckedSubjectsChange">
              <seal-radio-button v-for="item in subjects" :label="item.id" :key="item.id">{{ item.name }}</seal-radio-button>
            </seal-radio-group>
          </li>
        </ul>
      </div>
    </div>

    <!-- 数据列表 -->
    <div class="sealui-panel is-default">
      <div class="sealui-panel-heading">
        <h3 class="sealui-panel-title">展示列表</h3>
        <div class="panels-right" v-if="checkedAll.length">
          <seal-button type="success" icon="files" @click="bindingAll">批量绑定</seal-button>
        </div>
      </div>
      <div class="sealui-panel-body" v-if="courselists.length">
        <div class="table-head">
          <seal-checkbox :indeterminate="isIndeterminate"  v-model="checkAll" @change="handleCheckedAllChange">班次名称</seal-checkbox>
          <span class="table-head--title">讲义绑定数量</span>
          <span class="table-head--title">课件绑定数量</span>
          <span class="table-head--title">操作</span>
        </div>
        <div class="table-body">
          <seal-checkbox-group v-model="checkedAll" @change="handleCheckedListChange" >
            <ul>
              <li v-for="item in courselists">
                <seal-checkbox :name= "item.levelId" :label="item" :key="item.levelId">{{ item.levelName }}</seal-checkbox>
                <span class="table-head--title">1/30</span>
                <span class="table-head--title">0/30</span>
                <!-- <router-link :to="{path:'list',query:{id:1,d:schoolCode}}" class="binding-num"><i class="sealui-icon-editor"></i> 去绑定</router-link> -->
                <a href="javasvript:;" class="table-head--title" @click="bindingItem(item.levelId)"><i class="sealui-icon-editor"></i> 去绑定</a>
              </li>
            </ul>
          </seal-checkbox-group>
        </div>
      </div>
      <div class="sealui-panel-body" v-else>
        <div class="table-body">
          <p class="no-data-tip"><img src="@/assets/img/404.svg"><span>别看了，这里啥数据也没有...</span></p>
        </div>
      </div>
    </div>

    <!-- 分页 -->
    <seal-pagination layout="prev, pager, next" :total="total_num" v-if="courselists.length && total_num > 10" @current-change="handleCurrentChange" @size-change="handleCurrentChange"></seal-pagination>

    <!-- loading -->
    <div v-loading="loading" img="https://jiaoyanfz.aibeike.com/haibian/images/40@2x.png" text="稍等片刻..." background="rgba(0,0,0,.15)" color="success"></div>

  </div>
</template>

<script>

import cityList from '../cityList'
export default {
  name: 'Home',
  data (){
    return {
      isOpenFold      : true,
      loading         : false,
      courselists     : [],     // 列表数据

      cityList,                 // 城市列表
      courseTypes     : [],     // 年份列表
      terms           : [],     // 学期列表
      grades          : [],     // 年级列表
      subjects        : [],     // 学科列表

      schoolCode      : sessionStorage.getItem('schoolCode') || '',
      year            : sessionStorage.getItem('year') || '',
      termId          : sessionStorage.getItem('termId') || '',
      gradeId         : sessionStorage.getItem('gradeId') || '',
      subjectId       : sessionStorage.getItem('subjectId') || '',
      levelIds        : '',

      total_num       : 0,
      pageNo          : 1,

      checkAll        : false,
      isIndeterminate : true,
      checkedAll      : [],
    }
  },
  mounted(){
    let _self = this
    this.$nextTick().then(function () {
      _self.getAllTypes();
      if(_self.schoolCode && _self.year && _self.termId && _self.gradeId && _self.subjectId){
        _self.getDoubleCourseLevel()
      }
    })

  },
  methods: {
    // 城市选择
    handleCheckedCitiesChange(value){
      if(value){
        this.schoolCode = value;
        this.getDoubleCourseLevel(this.schoolCode)
        sessionStorage.setItem('schoolCode', value);
      }

    },
    // 年份选择
    handleCheckedCourseTypesChange(value){
      if(value){
        this.year = value;
        this.getDoubleCourseLevel(this.schoolCode,this.year)
        sessionStorage.setItem('year', value);
      }
    },
    // 学期选择
    handleCheckedPhaseChange(value){
      if(value){
        this.termId = value;
        this.getDoubleCourseLevel(this.schoolCode,this.year,this.termId)
        sessionStorage.setItem('termId', value);
      }
    },
    // 年级选择
    handleCheckedGradesChange(value){
      if(value){
        this.gradeId = value;
        this.getDoubleCourseLevel(this.schoolCode,this.year,this.termId,this.gradeId)
        sessionStorage.setItem('gradeId', value);
      }
    },
    // 学科选择
    handleCheckedSubjectsChange(value){
      if(value){
        this.subjectId = value;
        this.getDoubleCourseLevel(this.schoolCode,this.year,this.termId,this.gradeId,this.subjectId)
        sessionStorage.setItem('subjectId', value);
      }
    },
    // 获取筛选列表
    getAllTypes(){
      this.$request({
         url:'chn/bdNormal/findAllByTypes',
       }).then((res) => {
         if(res.status == 0){
          this.terms    = res.result[1];
          this.grades   = res.result[2];
          this.subjects = res.result[3];
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
     * 获取筛选后的数据
     * @param  {[type]} schoolCode [description]
     * @param  {[type]} year       [description]
     * @param  {[type]} termId     [description]
     * @param  {[type]} gradeId    [description]
     * @param  {[type]} subjectId  [description]
     * @param  {[type]} page       [description]
     * @return {[type]}            [description]
     */
    getDoubleCourseLevel(schoolCode,year,termId,gradeId,subjectId,page){
      this.loading = true
      this.$request({
        url:'chn/course/findDoubleCourseLevel',
        data:{
          schoolCode : schoolCode || '010',
          termId     : termId || 2,
          year       : year || 2018,
          gradeId    : gradeId || 1,
          subjectId  : subjectId || 'ff80808127d77caa0127d7e13be500c6',
          pageSize   : 10,
          pageNo     : page || 1
        }
      }).then((res) => {
        setTimeout(()=>{
          this.loading = false
        },300)

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
      this.getDoubleCourseLevel(this.schoolCode,this.year,this.termId,this.gradeId,this.subjectId,page)
    },

    // 刷新页面
    resetFiltrate (){
      sessionStorage.clear()
      this.schoolCode = ''
      this.year = ''
      this.termId = ''
      this.gradeId = ''
      this.subjectId = ''
      this.courselists = []
      // year            : sessionStorage.getItem('year') || '',
      // termId          : sessionStorage.getItem('termId') || '',
      // gradeId         : sessionStorage.getItem('gradeId') || '',
      // subjectId       : sessionStorage.getItem('subjectId') || '',
      //window.location.reload();
    },

    // 全选事件
    handleCheckedAllChange(event) {
      this.checkedAll = event.target.checked ? this.lists : [];
      this.isIndeterminate = false;
    },
    // 单个选择
    handleCheckedListChange(value) {
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.courselists.length;
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.courselists.length;
    },
    // 页面跳转
    gotoList(schoolCode,termId,year,gradeId,subjectId,levelIds){
      this.$router.push({ path: 'list', query: {
        schoolCode : schoolCode,
        termId     : termId,
        year       : year,
        gradeId    : gradeId,
        subjectId  : subjectId,
        levelIds   : levelIds
      }})
    },
    // 绑定单个
    bindingItem(levelId){
      this.gotoList(this.schoolCode,this.termId,this.year,this.gradeId,this.subjectId,levelId)
    },
    // 绑定所有
    bindingAll(){
      let levelIds = [];
      for(let item in this.checkedAll){
        levelIds.push(this.checkedAll[item]['levelId'])
      }
      levelIds = levelIds.join(',')
      this.gotoList(this.schoolCode,this.termId,this.year,this.gradeId,this.subjectId,levelIds)
    }
  },
  computed: {
    iconClass() {
      return this.isOpenFold ? 'plus' : 'minus';
    },
    listGroupArea() {
      return this.$el.getElementsByClassName('groupList')[0];
    },
    listGroupAreaHeight() {
      return this.$el.getElementsByClassName('list-group')[0].clientHeight;
    },
    aPlus: {
      set: function (v) {
        this.schoolCode = v - 1
      }
    }
  },
  watch: {
    isOpenFold(val) {
      this.listGroupArea.style.height = val ? `${this.listGroupAreaHeight}px` : '0';
    }
  },
}
</script>
<style lang="stylus">

  .table-head{
    background:rgba(232,234,237,0.5);
    border-bottom: 1px solid #e9e9e9;
    border-top: 1px solid #e9e9e9;
    margin-top: -1px;
    padding:10px 20px;
    font-weight:600
  }
  .table-body{
    margin-top:-1px;
  }
  .table-body li{
    padding: 8px 20px;
    line-height: 1.42857143;
    vertical-align: top;
    border-top: 1px solid #e9e9e9;
    word-break: break-all;
  }
  .table-body li:hover{
    background-color:#f8f8f8
  }
  .sealui-panel-body .sealui-checkbox{
    width: 50%
  }

  .sealui-panel-body .table-head--title{
    width : 20%;
    display:inline-block
  }
  .sealui-panel-body a.table-head--title{
    color:#20A0FF;
    text-decoration:none
  }
  .sealui-panel-body .table-head--title:last-child{
    width:10%;
    text-align:right
  }
  .groupList
    height auto
    transition: height .2s;
    overflow hidden
  .list-group
    margin-bottom 0px;
    .sealui-radio-group
      display:block
  .list-group-item
    padding 8px 15px
    border-bottom 1px solid #e9e9e9
    &:last-child
      border 0 none
    label
      font-weight 500
      font-size 16px
  label.label-title
    padding 5px 0 0 0
    display block
  .sealui-tag
    margin 3px 10px 3px 0;
    border-color transparent
    background-color #fff
    color #333
    font-size 14px
    &.is-check
      color #20a0ff
      border-color rgba(32,160,255,.5)
      background-color rgba(32,160,255,.1)
  label.sealui-radio-button
    font-weight 400
    &.is-active{
      font-weight 500
    }
  .sealui-radio-button__inner,
  .sealui-radio-button:first-child .sealui-radio-button__inner
    border 0 none
    border-radius 3px !important
    box-shadow 0 0 0 0 !important
  .sealui-radio-button:last-child .sealui-radio-button__inner,
  .sealui-radio-button:first-child .sealui-radio-button__inner
    border-radius 0 0 0 0
  .sealui-radio-button__orig-radio:disabled+.sealui-radio-button__inner
    background-color: transparent;
  .panels-right
    position absolute
    right 10px
    top 4px
    .sealui-button
      font-weight 500
      font-size 16px
  .sealui-pagination
    padding 20px 0
    margin-bottom 20px
    text-align: right;
  .sealui-pager li,
  .sealui-pagination button,
  .sealui-pagination span,
  .sealui-pager li.btn-quicknext,
  .sealui-pager li.btn-quickprev
    height 40px
    min-width 40px
    line-height 40px
    font-size 16px
  .sealui-pagination .btn-next .sealui-icon,
  .sealui-pagination .btn-prev .sealui-icon
    font-size 16px
</style>
