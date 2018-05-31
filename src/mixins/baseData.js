import cityList from '../cityList'
export default {
  data (){
    return {
      cityList,                     // 城市列表
      loading         : false,      // loading状态
      total_num       : 0,          // 数据总数
      pageNo          : 1,          // 请求页码
      schoolCode      : sessionStorage.getItem('schoolCode') || '',
      year            : sessionStorage.getItem('year') || '',
      termId          : sessionStorage.getItem('termId') || '',
      gradeId         : sessionStorage.getItem('gradeId') || '',
      subjectId       : 'ff80808127d77caa0127d7e13be500c6',
      noDataMessage   : '别看了，这里啥数据也没有,赶紧找经理吧...'
    }
  },
  methods:{
    /**
     * 从本地缓存获取基础数据
     * @return {[type]} [description]
     */
    getBaseData(obj){
      let sources = obj || {}
      let _data = {
        schoolCode : sessionStorage.getItem('schoolCode') || '',
        year       : sessionStorage.getItem('year') || '',
        termId     : sessionStorage.getItem('termId') || '',
        gradeId    : sessionStorage.getItem('gradeId') || '',
        userId     : sessionStorage.getItem('userId') || '',
        userName   : sessionStorage.getItem('userName') || '',
        subjectId  : 'ff80808127d77caa0127d7e13be500c6',
      }
      return Object.assign(sources,_data)
    },

    // 重置过滤条件
    resetFiltrate (){
      sessionStorage.clear()
      this.schoolCode = ''
      this.year       = ''
      this.termId     = ''
      this.gradeId    = ''
      //this.subjectId  = ''
      this.$emit('reset')
    },
  }
}
