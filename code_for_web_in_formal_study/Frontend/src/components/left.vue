<template>
<div>
    <div class="dataTitle">
        <el-divider style="border-top: 2px dashed #cacbcc; margin: 28px 0; width: 90%; display: inline-block;">
        <span class="title-font">DATASET</span>
        </el-divider>
    </div>

    <!-- 选择输入的数据集 -->
    <div>
        <el-scrollbar height="640px">
            <div v-for="item in setdata" :class="data.dataName === item.name ? 'scrollbar-dataset-item-active':'scrollbar-dataset-item'" :key="item.name" @click="getDataName(item.name)">
                <br>
                <span class="data-title"> {{ item.name }} </span>
                <span class="data-font-introduce"> {{item.illstruate}} </span>
            </div>
        </el-scrollbar>
    </div>

     <!-- 提示信息 -->
     <div class="dataTitle">
        <el-divider style="border-top: 2px dashed #cacbcc; margin: 28px 0; width: 90%; display: inline-block;">
        <span class="title-font">TIPS</span>
        </el-divider>
    </div>

    <div class="my-tips" style="">

    </div>
</div>

</template>

<script setup>
import { reactive, defineEmits } from 'vue';
const setdata = [
    // {name:"Southern Women", illstruate:"记录了18名女性在9个月的14次非正式社会活动中的社会互动"},
    // {name:"DBLP", illstruate:"记录了70位作者在30篇期刊论文中的合作关系"},
    // {name:"Co-Author Network", illstruate:"记录了学术出版物中作者之间的合作关系"},
    {name:"Southern Women", illstruate:"This dataset records the social interactions of 18 women during 14 informal social activities spanning a period of 9 months."},
    {name:"DBLP", illstruate:"This dataset records the collaborative relationships among 70 authors across 30 journal articles."},
    {name:"Co-Author Network", illstruate:"This dataset records the collaborative relationships among authors in academic publications."},
    
]
const data = reactive({
    dataset_value:'',
    dataset_options:'',
    methodName:'',
    dataName:''
});
const emit = defineEmits(['dataName']);
function getDataName(name){
    data.dataName = name;
    emit('dataName',data.dataName)
}

</script>

<style>
.dataTitle {
    text-align: center;
    align-items: center;
    /* 竖直方向，文字居中 */
}

.title-font{
    font-size: 25px;
    font-family:'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
}
.data-title{
    display: block;
    text-align: center;
    align-items: center;
    line-height: 1.8;
    font-size: 23px;
    font-family:'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
}

.data-font-introduce{
    display: block;
    line-height: 1.4;
    font-size: 19px;
    font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    margin-left: 12px;
    margin-right: 12px;
}
.scrollbar-dataset-item {
    display: block;
    align-items: center;
    justify-content: center;
    height: 200px;
    margin: 10px;
    text-align: center;
    border-radius: 4px;
    background: var(--el-color-primary-light-9);
}
.scrollbar-dataset-item:hover {
    position: relative;
    top: -1px;
    left: 0;
    box-shadow: 0px 5px 5px #c8c8c8;
    cursor:pointer;
}
.scrollbar-dataset-item-active {
    display: block;
    align-items: center;
    justify-content: center;
    height: 200px;
    margin: 10px;
    text-align: center;
    border-radius: 4px;
    background:#9fcbe5;
}

</style>