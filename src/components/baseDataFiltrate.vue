<template>
  <!-- 数据筛选 -->
  <div class="sealui-panel is-default">
    <div class="sealui-panel-heading">
      <h3 class="sealui-panel-title">属性筛选</h3>
      <div class="panels-right">
        <seal-button-group>
          <seal-button type="dark" icon="arrow-left" @click="gotoIndex">回首页</seal-button>
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
            <seal-radio-button label="ff80808127d77caa0127d7e13be500c6">语文</seal-radio-button>
          </seal-radio-group>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import baseData from '@/mixins/baseData';
  export default {
    name: 'SealBaseDataFiltrate',
    mixins : [ baseData ],
    data (){
      return {
        isOpenFold      : true,
        courseTypes     : [],     // 年份列表
        terms           : [],     // 学期列表
        grades          : [],     // 年级列表
        subjects        : [],     // 学科列表
      }
    },
    mounted(){
      let _self = this
      this.$nextTick().then(()=>{
        this.getAllTypes();
      })
    },
    methods:{
      // 城市选择
      handleCheckedCitiesChange(value){
        if(value){
          this.schoolCode = value;
          sessionStorage.setItem('schoolCode', value);
          this.$emit('filtrateChange')
        }

      },
      // 年份选择
      handleCheckedCourseTypesChange(value){
        if(value){
          this.year = value;
          //this.getDoubleCourseLevel(this.schoolCode,this.year)
          sessionStorage.setItem('year', value);
          this.$emit('filtrateChange')
        }
      },
      // 学期选择
      handleCheckedPhaseChange(value){
        if(value){
          this.termId = value;
          //this.getDoubleCourseLevel(this.schoolCode,this.year,this.termId)
          sessionStorage.setItem('termId', value);
          this.$emit('filtrateChange')
        }
      },
      // 年级选择
      handleCheckedGradesChange(value){
        if(value){
          this.gradeId = value;
          //this.getDoubleCourseLevel(this.schoolCode,this.year,this.termId,this.gradeId)
          sessionStorage.setItem('gradeId', value);
          this.$emit('filtrateChange')
        }
      },
      // 学科选择
      handleCheckedSubjectsChange(value){
        if(value){
          this.subjectId = value;
          //this.getDoubleCourseLevel(this.schoolCode,this.year,this.termId,this.gradeId,this.subjectId)
          sessionStorage.setItem('subjectId', value);
          this.$emit('filtrateChange')
        }
      },

      /**
       * 获取筛选基础数据列表
       * @return {[type]} [description]
       */
      getAllTypes(){
        this.$request({
           url:'chn/bdNormal/findAllByTypes',
         }).then((res) => {
           if(res.status == 0){
            this.terms    = res.result[1];
            this.grades   = res.result[2];
            this.subjects = res.result[3];
            localStorage.setItem('termLists', JSON.stringify(res.result[1]));
            localStorage.setItem('gradeLists', JSON.stringify(res.result[2]));
            localStorage.setItem('subjectLists', JSON.stringify(res.result[3]));
           }
         },(error) => {
          this.loading = false
          this.$message({
            type: 'error',
            message: '服务器返回错误'
          });
         })
      },

      gotoIndex(){
        this.$router.push('/')
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
      }
    },
    watch: {
      isOpenFold(val) {
        this.listGroupArea.style.height = val ? `${this.listGroupAreaHeight}px` : '0';
      }
    },
  }
</script>
