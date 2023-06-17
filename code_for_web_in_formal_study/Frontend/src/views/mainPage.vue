<template>
    <div class="common-layout">
        <el-container>
            <el-aside class="leftAside" width="320px">
                <left @dataName = "getDataName"></left>
            </el-aside>
            <el-container>
              <el-header class="rightTop" style="height:200px;">
                <rightTop @methodName = "getMethodName"></rightTop>
              </el-header>
              <el-main> 
                <rightMain :datasetName="data.dataName" :methodName="data.methodName" @questionindex="getNowquestion"></rightMain>
              </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script setup>
import left from '@/components/left.vue';
import rightTop from '@/components/rightTop.vue';
import rightMain from '@/components/rightMain.vue';

import { reactive} from "vue";
 
  const data = reactive({
    dataName:'',
    methodName:'',
    questionindex:true
  })
  const getDataName = (val)=>{
    data.dataName = val
  };
  const getMethodName = (val)=>{
    data.methodName = val
  };
  const getNowquestion = (val)=>{
    data.questionindex = val
  };

</script>

<style>
.common-layout{
  background-color: rgb(244, 244, 244) ;
}

.leftAside{
  background-color: white;
  border-radius: 8px; 
  margin-left: 8px;
  margin-top: 8px;
  margin-right: 8px;
}

.rightAside{
  background-color: white;
  border-radius: 8px; 
  margin-left: 8px;
  margin-top: 8px;
  margin-right: 8px;
}

.rightTop{
  border-radius: 8px; 
  background-color: white; 
  margin-left: 8px;
  margin-right: 8px;
  margin-top: 8px;
};




</style>