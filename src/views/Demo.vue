<template>
  <div class="home">
    <SealPanels></SealPanels>
    <seal-tag>标签一</seal-tag>
    <seal-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</seal-checkbox>

    <seal-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
      <seal-checkbox v-for="item in lists" :label="item" :key="item.id">{{item}}</seal-checkbox>
    </seal-checkbox-group>
    <!-- <HelloWorld msg="谁是文豪 - 大语文"/> -->
    <seal-select v-model="value" placeholder="请选择">
      <seal-option
        v-for="item in options"
        :label="item.label"
        :value="item.value"
        :key="item.id">
      </seal-option>
    </seal-select>
    <button @click="requestData()">asdas</button>
    {{avatar_url}}
    <p v-for="item in cityList">{{item}}</p>

  </div>
</template>

<script>
// @ is an alias to /src
//import HelloWorld from '@/components/HelloWorld.vue'
const listOptions = ['JS', 'CSS', 'Html', 'PHP'];
import cityList from '../cityList.json'
export default {
  name: 'Demo',
  data (){
    return {
      checkAll: true,
      checkedCities: ['JS', 'CSS'],
      lists: listOptions,
      isIndeterminate: true,
      loading: true,
      avatar_url:'',
      cityList,
      options: [{
          value: '选项1',
          label: 'JavaScript'
        }, {
          value: '选项2',
          label: 'CSS3'
        }, {
          value: '选项3',
          label: 'HTML5'
        }, {
          value: '选项4',
          label: 'PHP'
        }, {
          value: '选项5',
          label: 'IOS'
        }],
        value: '',

    }
  },
  mounted(){
    //console.log(city)
    // for(let i = 0;i<=city.length;i++){
    //   console.log(city[i])
    // }
    // for(let item in city){
    //   console.log(city[item].name)
    // }
  },
  methods: {
    handleChange(ev) {
      console.log(ev);
    },
    handleCheckAllChange(event) {
      this.checkedCities = event.target.checked ? listOptions : [];
      this.isIndeterminate = false;
      console.log(this.checkedCities)
    },
    handleCheckedCitiesChange(value) {
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.lists.length;
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.lists.length;
    },
    requestData(){
     let _self = this;
     this.$request({
       url:'//api.github.com/users/sealui',
     }).then((res) => {
       _self.avatar_url = res.avatar_url
     },(error) => {
       console.log(error)
     })
   }
  }
}
</script>
