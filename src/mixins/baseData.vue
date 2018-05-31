<template>
    <div v-loading="loading" img="@/assets/img/logo.png" text="让数据飞一会..." background="rgba(0,0,0,.15)" color="success"></div>
</template>
export default {
  data (){
    return {
      loading         : false,
      courselists     : [],     // 列表数据
      schoolCode      : sessionStorage.getItem('schoolCode') || '',
      year            : sessionStorage.getItem('year') || '',
      termId          : sessionStorage.getItem('termId') || '',
      gradeId         : sessionStorage.getItem('gradeId') || '',
      subjectId       : sessionStorage.getItem('subjectId') || '',
    }
  },
  methods:{
    // 重置过滤条件
    resetFiltrate (){
      sessionStorage.clear()
      this.schoolCode = ''
      this.year = ''
      this.termId = ''
      this.gradeId = ''
      this.subjectId = ''
      //this.courselists = []
      this.$emit('reset')
    },
  }
}
