<template>
  <div class="page-content">
    <SealPanels title="属性筛选">
      <div slot="titleRight" class="panels-right">
        <seal-button-group>
          <seal-button type="success" icon="morning" @click="reloadPage">重 置</seal-button>
          <seal-button type="success" :icon="iconClass" @click="isOpenFold = !isOpenFold">{{isOpenFold ? '折 叠' : '展 开'}}</seal-button>
        </seal-button-group>
      </div>
      <div class="groupList">
        <ul class="list-group">
          <li class="list-group-item">
            <label class="label-title">城市：</label>
            <seal-radio-group v-model="cityCheck" @on-change="handleCheckedCitiesChange">
              <seal-radio-button v-for="item in cityList" :label="item.id" :key="item.id">{{item.name}}</seal-radio-button>
            </seal-radio-group>
            <!-- <seal-tag @click="dd">北京</seal-tag>
            <seal-tag @click="dd">广州</seal-tag>
            <seal-tag @click="dd">深圳</seal-tag>
            <seal-tag @click="dd">上海</seal-tag>
            <seal-tag @click="dd">成都</seal-tag>
            <seal-tag @click="dd">天津</seal-tag> -->
          </li>
          <li class="list-group-item">
            <label class="label-title">年份：</label>
            <seal-radio-group v-model="courseTypesCheck" type="info" @on-change="handleCheckedCourseTypesChange">
              <seal-radio-button label="2020"></seal-radio-button>
              <seal-radio-button label="2019"></seal-radio-button>
              <seal-radio-button label="2018"></seal-radio-button>
              <seal-radio-button label="2017"></seal-radio-button>
            </seal-radio-group>
          </li>
          <li class="list-group-item">
            <label class="label-title">学期：</label>
            <seal-radio-group v-model="phaseCheck" type="success"  @on-change="handleCheckedPhaseChange">
              <seal-radio-button v-for="item in phase" :label="item.id" :key="item.id">{{ item.name }}</seal-radio-button>
            </seal-radio-group>
          </li>
          <li class="list-group-item">
            <label class="label-title">年级：</label>
            <seal-radio-group v-model="gradesCheck"  type="dark"  @on-change="handleCheckedGradesChange">
              <seal-radio-button v-for="item in grades" :label="item.id" :key="item.id">{{ item.name }}</seal-radio-button>
            </seal-radio-group>
          </li>
          <li class="list-group-item">
            <label class="label-title">学科：</label>
            <seal-radio-group v-model="subjectsCheck" type="danger"  @on-change="handleCheckedSubjectsChange">
              <seal-radio-button v-for="item in subjects" :label="item.id" :key="item.id">{{ item.name }}</seal-radio-button>
            </seal-radio-group>
          </li>
        </ul>
      </div>
    </SealPanels>
    <SealPanels title="展示列表" :lists="lists"></SealPanels>

    <!-- 分页 -->
    <seal-pagination layout="prev, pager, next" :total="total_num" v-if="lists.length && total_num > 10" @current-change="handleCurrentChange" @size-change="handleCurrentChange"></seal-pagination>

    <!-- loading -->
    <div v-loading="loading" img="https://jiaoyanfz.aibeike.com/haibian/images/40@2x.png" text="稍等片刻..." background="rgba(0,0,0,.15)" color="success"></div>
  </div>
</template>

<script>

import cityList from '../cityList'
import baseData from '@/mixins/baseData.js'
import SealPanels from '@/components/panels'
export default {
  name: 'Home',
  data (){
    return {
      isOpenFold       : true,
      loading          : false,
      lists            : [], // 列表数据
      cityCheck        : '',
      courseTypesCheck : '',
      phaseCheck       : '',
      gradesCheck      : '',
      subjectsCheck    : '',

      cityList,    // 城市列表
      courseTypes      : [],    // 年份列表
      phase            : [],    // 学期列表
      grades           : [],    // 年级列表
      subjects         : [],     // 学科列表


      total_num : 0,
      pageNo : 1
    }
  },
  mixins:[baseData],
  mounted(){
    this.getAllTypes();
    this.getDoubleCourseLevel()
  },
  components:{
    SealPanels
  },
  methods: {
    // 城市选择
    handleCheckedCitiesChange(value){
      if(value) this.schoolCode = value;
      this.getDoubleCourseLevel(this.schoolCode)
    },
    // 年份选择
    handleCheckedCourseTypesChange(value){
      if(value) this.year = value;

      this.getDoubleCourseLevel(this.schoolCode,this.year)
    },
    // 学期选择
    handleCheckedPhaseChange(value){
      if(value) this.termId = value;
      this.getDoubleCourseLevel(this.schoolCode,this.year,this.termId)
    },
    // 年级选择
    handleCheckedGradesChange(value){
      if(value) this.gradeId = value;
      this.getDoubleCourseLevel(this.schoolCode,this.year,this.termId,this.gradeId)
    },
    // 学科选择
    handleCheckedSubjectsChange(value){
      if(value) this.subjectId = value;
      this.getDoubleCourseLevel(this.schoolCode,this.year,this.termId,this.gradeId,this.subjectId)
    },
    // 获取筛选列表
    getAllTypes(){
      this.$request({
         url:'chn/bdNormal/findAllByTypes',
       }).then((res) => {
         if(res.status == 0){
          this.phase    = res.result[1];
          this.grades   = res.result[2];
          this.subjects = res.result[3];
         }
       },(error) => {
          this.loading = false
         console.log(error)
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
          this.lists = res.result.rows
          this.total_num = res.result.totalCount
        }
      },(error) => {
        this.loading = false
        console.log(error)
      })
    },

    // 分页事件
    handleCurrentChange(page){
      this.getDoubleCourseLevel(this.schoolCode,this.year,this.termId,this.gradeId,this.subjectId,page)
    },

    // 刷新页面
    reloadPage (){
      window.location.reload()
    },

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
