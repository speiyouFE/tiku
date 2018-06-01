(window["webpackJsonpSealUI"]=window["webpackJsonpSealUI"]||[]).push([[3],{"8Qwj":function(e,t,a){"use strict";a.r(t);var s=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"page-content"},[s("div",{staticClass:"sealui-panel is-default"},[e._m(0),s("div",{staticClass:"sealui-panel-body"},[s("table",{staticClass:"table table-hover"},[e._m(1),s("tbody",e._l(100,function(t){return s("tr",[s("td",{attrs:{align:"left"}},[e._v("\u7b2c"+e._s(t)+"\u8bfe")]),s("td",{attrs:{align:"left",width:"60%"}},[e._l(e.classPaperLists,function(a,l){return l==t?s("div",{key:a.id,staticStyle:{display:"inline-block"}},e._l(a.classPaperRelateList,function(a,l){return s("seal-tag",{key:a.id,attrs:{type:"border",theme:e._f("randomTheme")(l),closable:!0,id:"tag_"+t+"_"+l},on:{click:function(t){e.gotoPaperUrl(a.paperUrl)},close:function(s){e.handleCloseTag(t+"_"+l,a.paperId,a.cnum)}}},[e._v(e._s(a.paperName))])})):e._e()}),s("seal-button",{attrs:{size:"small",type:"info"},on:{click:function(a){e.createAddPaperDialog(t)}}},[e._v("\u6dfb\u52a0\u8bb2\u4e49")])],2),s("td",{attrs:{align:"center"}},[e._v(e._s(e.userName))])])}))])])]),s("seal-dialog",{attrs:{width:"800px","custom-class":"createAddPaperDialog","show-close":!e.paperId,"close-on-click-modal":!1,visible:e.createAddPaperDialogVisible},on:{"on-open":e.getPaperFoldersList,"update:visible":function(t){e.createAddPaperDialogVisible=t}}},[s("div",{staticClass:"dialog-header",attrs:{slot:"title"},slot:"title"},[e._v("\u6dfb\u52a0\u8bb2\u4e49(\u7b2c"+e._s(e.classNum)+"\u8bfe)")]),s("div",{staticClass:"paperDialog-select"},[s("seal-select",{attrs:{size:"small",placeholder:"\u57ce\u5e02"},on:{change:function(t){e.handleSelectChange("schoolCode",e.schoolCode)}},model:{value:e.schoolCode,callback:function(t){e.schoolCode=t},expression:"schoolCode"}},e._l(e.cityList,function(e){return s("seal-option",{key:e.id,attrs:{label:e.name,value:e.id}})})),s("seal-select",{attrs:{size:"small",placeholder:"\u5e74\u4efd"},on:{change:function(t){e.handleSelectChange("year",e.year)}},model:{value:e.year,callback:function(t){e.year=t},expression:"year"}},[s("seal-option",{attrs:{label:"2017",value:"2017"}}),s("seal-option",{attrs:{label:"2018",value:"2018"}}),s("seal-option",{attrs:{label:"2019",value:"2019"}}),s("seal-option",{attrs:{label:"2020",value:"2020"}})],1),s("seal-select",{attrs:{size:"small",placeholder:"\u5e74\u7ea7"},on:{change:function(t){e.handleSelectChange("grade",e.gradeId)}},model:{value:e.gradeId,callback:function(t){e.gradeId=t},expression:"gradeId"}},e._l(e.gradeLists,function(e){return s("seal-option",{key:e.id,attrs:{label:e.name,value:e.id}})})),s("seal-select",{attrs:{size:"small",placeholder:"\u5b66\u79d1",disabled:""},on:{change:function(t){e.handleSelectChange("subject",e.subjectId)}},model:{value:e.subjectId,callback:function(t){e.subjectId=t},expression:"subjectId"}},[s("seal-option",{attrs:{label:"\u8bed\u6587",value:"ff80808127d77caa0127d7e13be500c6"}})],1),s("seal-select",{attrs:{size:"small",placeholder:"\u5b66\u671f"},on:{change:function(t){e.handleSelectChange("term",e.termId)}},model:{value:e.termId,callback:function(t){e.termId=t},expression:"termId"}},e._l(e.termLists,function(e){return s("seal-option",{key:e.id,attrs:{label:e.name,value:e.id}})}))],1),s("div",{staticClass:"folderslists-content"},[s("div",{staticClass:"folder-cont"},[s("div",{staticClass:"folder-title"},[e._v("\u6587\u4ef6\u5939")]),s("div",{staticClass:"folder-list"},[e.folderslists.length>0?s("ul",e._l(e.folderslists,function(t){return s("li",{on:{click:function(a){e.getPapersByFolder(t.id)}}},[s("span",{staticClass:"folder-name"},[e._v(e._s(t.name))]),s("i",{staticClass:"sealui-icon-arrow-right"})])})):s("p",{staticClass:"no-data-tip"},[s("img",{attrs:{src:a("jnEV")}}),s("span",[e._v(e._s(e.noDataMessage))])])])]),s("div",{staticClass:"folder-cont"},[s("div",{staticClass:"folder-title"},[e._v("Paper \u540d\u79f0")]),s("div",{staticClass:"paper-list"},[e.paperLists.length>0?s("ul",e._l(e.paperLists,function(t){return s("li",[s("span",{staticClass:"folder-name",on:{click:function(a){e.selectPaper(t.paperId)}}},[e._v(e._s(t.name))])])})):s("p",{staticClass:"no-data-tip"},[s("img",{attrs:{src:a("jnEV")}}),s("span",[e._v(e._s(e.noDataMessage))])])])])]),e.paperId?s("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[s("seal-button",{on:{click:function(t){e.createAddPaperDialogVisible=!1}}},[e._v("\u53d6 \u6d88")]),s("seal-button",{attrs:{type:"primary"},on:{click:e.bindPaper}},[e._v("\u786e \u5b9a")])],1):e._e()]),s("div",{directives:[{name:"loading",rawName:"v-loading",value:e.loading,expression:"loading"}],attrs:{img:"https://jiaoyanfz.aibeike.com/haibian/images/40@2x.png",text:"\u7a0d\u7b49\u7247\u523b...",background:"rgba(0,0,0,.15)",color:"success"}})],1)},l=[function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"sealui-panel-heading"},[a("h3",{staticClass:"sealui-panel-title"},[e._v("\u5927\u8bed\u6587 ")]),a("div",{staticClass:"panels-right"})])},function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("thead",[a("tr",[a("th",{attrs:{align:"left"}},[e._v("\u8bfe\u6b21")]),a("th",{attrs:{align:"left",width:"85%"}},[e._v("\u8bb2\u4e49\u540d\u79f0")]),a("th",{attrs:{align:"center",width:"8%"}},[e._v("\u64cd\u4f5c\u4eba")])])])}],i=(a("VRzm"),a("JqEL")),n=a("sDY1"),r=a("o26T"),o={name:"PaperList",mixins:[r["a"]],data:function(){return{cityList:n["a"],gradeLists:JSON.parse(localStorage.getItem("gradeLists"))||[],termLists:JSON.parse(localStorage.getItem("termLists"))||[],subjectLists:JSON.parse(localStorage.getItem("subjectLists"))||[],createAddPaperDialogVisible:!1,folderslists:[],paperLists:[],classPaperLists:[],paperId:null,levelIds:this.$route.query.levelIds,userName:sessionStorage.getItem("userName")}},created:function(){},mounted:function(){var e=this;this.$nextTick().then(function(){e.getPapers(e.levelIds)})},filters:{randomTheme:function(e){var t=Math.random(),a="";return a=t>0&&t<=.3?"danger":t>.3&&t<=.5?"success":t>.5&&t<=.7?"warning":"primary",a}},methods:{getPapers:function(e){var t=this;this.$request({url:"/class/papers",data:this.getBaseData({levelIds:e})}).then(function(e){t.loading=!1,0==e.status?t.classPaperLists=e.result:t.classPaperLists=[]},function(e){t.loading=!1,t.$message({type:"error",message:"\u670d\u52a1\u5668\u8d85\u65f6"}),console.log(e.message)})},handleCloseTag:function(e,t,a){var s=this,l=this;this.$confirm("\u6b64\u64cd\u4f5c\u5c06\u89e3\u7ed1\u73b0\u6709\u8bb2\u4e49, \u662f\u5426\u7ee7\u7eed?","\u7cfb\u7edf\u63d0\u793a",{confirmButtonText:"\u89e3\u7ed1\u5427",cancelButtonText:"\u7b49\u7b49\uff0c\u8003\u8651\u4e00\u4e0b",type:"warning",closeOnClickModal:!1}).then(function(){s.$request({url:"/class/unbindPaper",method:"DELETE",data:{paperId:t,cnum:a,levelIds:s.levelIds}}).then(function(e){0==e.status&&(l.$message.success("\u89e3\u7ed1\u6210\u529f"),s.getPapers(s.levelIds))},function(e){})}).catch(function(){})},delAction:function(e){this.$confirm("\u6b64\u64cd\u4f5c\u5c06\u89e3\u7ed1\u73b0\u6709\u8bb2\u4e49, \u662f\u5426\u7ee7\u7eed?","\u7cfb\u7edf\u63d0\u793a",{confirmButtonText:"\u89e3\u7ed1\u5427",cancelButtonText:"\u7b49\u7b49\uff0c\u8003\u8651\u4e00\u4e0b",type:"warning",closeOnClickModal:!1}).then(function(){e()}).catch(function(){})},createAddPaperDialog:function(e){this.classNum=e,this.createAddPaperDialogVisible=!0},handleSelectChange:function(e,t){switch(e){case"schoolCode":this.schoolCode=t;break;case"year":this.year=t;break;case"grade":this.gradeId=t;break;case"subject":this.subjectId=t;break;case"term":this.termId=t;break}this.getPaperFoldersList()},getPaperFoldersList:function(){var e=this;this.loading=!0,this.$request({url:"paperFolders/list",data:{schoolCode:this.schoolCode,year:this.year,termId:this.termId,gradeId:this.gradeId,subjectId:"ff80808127d77caa0127d7e13be500c6"}}).then(function(t){e.loading=!1,0==t.status&&t.result.length>0?e.folderslists=t.result:(e.folderslists=[],e.paperLists=[],e.paperId=null)},function(t){e.loading=!1,e.$message.error("\u670d\u52a1\u5668\u8fd4\u56de\u9519\u8bef")})},getPapersByFolder:function(e){var t=this;if(!e)return!1;for(var a=0;a<=event.path[2].children.length;a++)Object(i["f"])(event.path[2].children[a],"active");Object(i["a"])(event.target.parentNode,"active"),this.loading=!0,this.$request({url:"paperFolders/".concat(e,"/papers")}).then(function(e){t.loading=!1,0==e.status&&e.result.length>0?t.paperLists=e.result:(t.paperId=null,t.paperLists=[])},function(e){t.loading=!1,t.$message.error("\u670d\u52a1\u5668\u8fd4\u56de\u9519\u8bef")})},selectPaper:function(e){for(var t=0;t<=event.path[2].children.length;t++)Object(i["f"])(event.path[2].children[t],"active");Object(i["a"])(event.target.parentNode,"active"),e&&(this.paperId=e)},bindPaper:function(){var e=this,t=this;this.loading=!0,this.$request({url:"class/bindPaper",method:"POST",data:{schoolCode:this.schoolCode,year:this.year,termId:this.termId,gradeId:this.gradeId,subjectId:"ff80808127d77caa0127d7e13be500c6",paperId:this.paperId,cnum:this.classNum,levelIdStr:this.levelIds}}).then(function(a){e.loading=!1,0==a.status?(e.$message({duration:1e3,type:"success",message:"\u6dfb\u52a0\u8bb2\u4e49\u6210\u529f",onClose:function(){t.getPapers(t.levelIds)}}),e.createAddPaperDialogVisible=!1,e.paperLists=[]):3==a.status&&e.$message.warning("\u4e0d\u80fd\u91cd\u590d\u7ed1\u5b9a")},function(t){e.loading=!1,e.$message.error("\u670d\u52a1\u5668\u8fd4\u56de\u9519\u8bef")})},gotoPaperUrl:function(e){window.open(e,"_blank")}}},c=o,d=(a("Balj"),a("KHd+")),u=Object(d["a"])(c,s,l,!1,null,"479589bb",null);t["default"]=u.exports},Balj:function(e,t,a){"use strict";var s=a("oOzM"),l=a.n(s);l.a},jnEV:function(e,t,a){e.exports=a.p+"static/img/404.10124b6e.svg"},oOzM:function(e,t,a){}}]);