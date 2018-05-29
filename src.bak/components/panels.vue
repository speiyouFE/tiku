<template>
  <div class="sealui-panel is-default">
    <div class="sealui-panel-heading">
      <h3 class="sealui-panel-title">{{ title }}</h3>
      <slot name="titleRight"></slot>
      <div v-if="checkedCities.length" class="panels-right">
        <seal-button type="success" icon="files" @click="bindingAll">批量绑定</seal-button>
      </div>
    </div>
    <div class="sealui-panel-body" v-if="lists">
      <div class="table-head" v-if="lists.length">
        <seal-checkbox :indeterminate="isIndeterminate"  v-model="checkAll" @change="handleCheckAllChange">班次名称</seal-checkbox>
        <span class="binding-num">讲义绑定数量</span>
        <span class="binding-num">课件绑定数量</span>
        <span class="binding-num">操作</span>
      </div>
      <div class="table-body" v-if="lists.length">
        <seal-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange" >
          <ul>
            <li v-for="item in lists">
              <seal-checkbox :name= "item.levelId" :label="item" :key="item.levelId">{{ item.levelName }}</seal-checkbox>
              <span class="binding-num">1/30</span>
              <span class="binding-num">0/30</span>
              <!-- <router-link :to="{path:'list',query:{id:1}}" class="binding-num"><i class="sealui-icon-editor"></i> 去绑定</router-link> -->
              <a href="javasvript:;" class="binding-num" @click="bindingItem(item.levelId)"><i class="sealui-icon-editor"></i> 去绑定</a>
            </li>
          </ul>
        </seal-checkbox-group>
      </div>
      <div class="table-body" v-else>
        <p class="no-text">暂无数据...</p>
      </div>
    </div>
    <div class="sealui-panel-body" v-else>
      <slot></slot>
    </div>
  </div>
</template>

<script>
  import baseData from '@/mixins/baseData.js'
  export default {
    name: 'SealPanels',
    data (){
      return {
        checkAll: false,
        isIndeterminate : true,
        checkedCities : [],
        value: '',
      }
    },
    props: {
      lists:Array,
      title:String,
      isCheckbox:{
        type:Boolean,
        default:false
      }
    },
    mixins:[baseData],
    methods: {
      // 全选事件
      handleCheckAllChange(event) {
        this.checkedCities = event.target.checked ? this.lists : [];
        this.isIndeterminate = false;
      },
      // 单个选择
      handleCheckedCitiesChange(value) {
        let checkedCount = value.length;
        this.checkAll = checkedCount === this.lists.length;
        this.isIndeterminate = checkedCount > 0 && checkedCount < this.lists.length;
      },
      // 绑定单个
      bindingItem(id){
        alert(id)
      },
      // 绑定所有
      bindingAll(){
        console.log(this.schoolCode)
        for(let item in this.checkedCities){
          console.log(this.checkedCities[item].levelName)
        }
      }
    }
  }
</script>

<style>
.sealui-panel{
  margin-bottom: 20px;
  background-color: #fff;
  border: 1px solid #e9e9e9;
  border-radius: 2px;
  color: #333;
  -webkit-box-shadow: 0 2px 5px 0 rgba(140, 144, 155, 0.15);
  -moz-box-shadow: 0 2px 5px 0 rgba(140, 144, 155, 0.15);
  box-shadow: 0 2px 5px 0 rgba(140, 144, 155, 0.15);
  margin-bottom : 10px;
}
.sealui-panel.is-default{
  border-color:#20a0ff;
}
.sealui-panel.is-default .sealui-panel-heading{
  background-color:#20a0ff;
  color:#fff
}
.sealui-panel-heading{
  padding: 10px 15px;
  border-bottom: 0px solid #e9e9e9;
  border-top-right-radius: 2px;
  border-top-left-radius: 2px;
  background: #fff;
  color: #333;
  border-color: #e8eaed;
  background: #fff;
  position: relative;
}
.sealui-panel-title{
  margin: 0px;
  padding: 0px;
  font-size: 16px;
  font-weight: 400;
  margin-top: 2px;
  margin-bottom: 2px;
  font-size: 20px;
  letter-spacing: .6px;
  line-height: 24px;
}
.sealui-panel-body{
  padding: 0px;
}
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

.sealui-panel-body .binding-num{
  width : 20%;
  display:inline-block
}
.sealui-panel-body a.binding-num{
  color:#20A0FF;
  text-decoration:none
}
.sealui-panel-body .binding-num:last-child{
  width:10%;
  text-align:right
}
.binding{
  display:inline-block;
  width:50%
}
.no-text{
  font-size:20px;
  text-align:center;
  line-height:30px;
  padding:20px 0
}
</style>
