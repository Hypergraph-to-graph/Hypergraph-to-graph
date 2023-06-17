<template>
<div height="150px" >
  <!-- 标题栏 -->
  <div class="title">
    <el-divider style="border-top: 2px dashed #cacbcc; margin: 28px 0;">
      <span style="font-size: 25px;font-family:'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;">METHODS</span>
    </el-divider>
  </div>
  <!-- 选择方法栏 -->
  <el-tooltip v-for="item in setmethods" :key="item" effect="light" :content="item.illstruate" :hide-after=1 placement="bottom">
    <div :class="data.methodName === item.method ? 'scrollbar-item-active':'scrollbar-item'" :key="item.method" @click="getMethodName(item.method)">
        <div style="width: 115px;">
            <img :src="item.iconSrc" style="width: 75px;height: 75px;"><br>{{ item.method }}
        </div>
    </div>
  </el-tooltip>

</div>
</template>

<script setup>
import { reactive, defineEmits } from 'vue';

  const data = reactive({
      dataset_value:'',
      dataset_options:'',
      methodName:'',
  });
  // const setmethods = [
  //     {method:"Split-complete", iconSrc:require('@/static/icon/1.png'), illstruate:"Split-complete"},
  //     {method:"Split-path", iconSrc:require('@/static/icon/2.png'), illstruate:"Split-path"},
  //     {method:"Split-cycle", iconSrc:require('@/static/icon/3.png'), illstruate:"Split-cycle"},
  //     {method:"Aggregate-collapse", iconSrc:require('@/static/icon/4.png'), illstruate:"Aggregate-collapse"},
  //     {method:"Aggregate-summarize", iconSrc:require('@/static/icon/5.png'), illstruate:"Aggregate-summarize"},
  //     {method:"Aggregate-relathionship-summarize",iconSrc:require('@/static/icon/6.png'), illstruate:"Aggregate-relathionship-summarize"},
  //     {method:"Centroid-within-layer",iconSrc:require('@/static/icon/7.png'), illstruate:"Centroid-within-layer"},
  //     {method:"Centroid-aggregate-relationship-summarize",iconSrc:require('@/static/icon/8.png'), illstruate:"Split-complete"},
  //     {method:"Centroid-aggregate-summarize",iconSrc:require('@/static/icon/9.png'), illstruate:"Split-complete"},
  //     {method:"Line-expansion",iconSrc:require('@/static/icon/10.png'), illstruate:"Split-complete"},
  //     {method:"Line-expansion-aggregate-summarize",iconSrc:require('@/static/icon/11.png'), illstruate:"Split-complete"},
  //     {method:"Line-expansion-aggregate-relationship-summarize",iconSrc:require('@/static/icon/12.png'), illstruate:"Split-complete"},
  // ];
  
  

  const setmethods = [
      {method:"Split-complete", iconSrc:require('@/static/icon/1.png'), illstruate:"Split-complete"},
      {method:"Split-path", iconSrc:require('@/static/icon/2.png'), illstruate:"Split-path"},
      {method:"Split-cycle", iconSrc:require('@/static/icon/3.png'), illstruate:"Split-cycle"},
      {method:"Aggregate1", iconSrc:require('@/static/icon/4.png'), illstruate:"Aggregate-collapse"},
      {method:"Aggregate2", iconSrc:require('@/static/icon/5.png'), illstruate:"Aggregate-summarize"},
      {method:"Aggregate3",iconSrc:require('@/static/icon/6.png'), illstruate:"Aggregate-relathionship-summarize"},
      {method:"Centroid1",iconSrc:require('@/static/icon/7.png'), illstruate:"Centroid-within-layer"},
      {method:"Centroid2",iconSrc:require('@/static/icon/8.png'), illstruate:"Split-complete"},
      {method:"Centroid3",iconSrc:require('@/static/icon/9.png'), illstruate:"Split-complete"},
      {method:"expansion1",iconSrc:require('@/static/icon/10.png'), illstruate:"Split-complete"},
      {method:"expansion2",iconSrc:require('@/static/icon/11.png'), illstruate:"Split-complete"},
      {method:"expansion3",iconSrc:require('@/static/icon/12.png'), illstruate:"Split-complete"},
  ];
  const emit = defineEmits(['methodName']);

  function getMethodName(name){
    data.methodName = name;
    emit('methodName',data.methodName)
  }

</script>

<style>

.title{
  height: 30px;
  text-align: center;
  align-items: center;
}

.el-divider--horizontal{
  margin: 8px 0;
  border-top: 1px dashed #e8eaec;
} 

.scrollbar-item {
  display: inline-block;
  align-items: center;
  margin: 4px;
  height: 115px;
  width: 115px;
  text-align: center;
  border-radius: 4px;
  background: var(--el-color-primary-light-9);
}

.scrollbar-item:hover {
    top: -1px;
    left: 0;
    box-shadow: 0px 5px 5px #c8c8c8;
    cursor:pointer;
}

.scrollbar-item-active {
  display: inline-block;
  align-items: center;
  margin: 4px;
  height: 115px;
  width: 115px;
  text-align: center;
  border-radius: 4px;
  background:#9fcbe5;
}

</style>