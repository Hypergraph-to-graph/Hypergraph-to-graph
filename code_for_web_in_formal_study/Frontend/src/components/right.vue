<template>
    <div style="height: 40px;" class="title">
        <p class="title">DATA PIPELINES</p>
    </div>
    <el-divider border-style="dashed"/>
    
    <div style="margin-left: 2px; padding-left: 3px;" >
        <!-- 选择输入的数据集 -->
        <div class="alignment-container">
            <p>Dataset:</p> 
            <el-scrollbar height="185px">
                <el-tooltip v-for="item in setmethods" :key="item" effect="light" :content="item.method" :hide-after=1 placement="bottom">
                    <div :class="data.methodName === item.method ? 'scrollbar-demo-item-active':'scrollbar-demo-item'" :key="item.method" @click="getMethodName(item.method)">
                        &nbsp;&nbsp;
                        <img :src="item.iconSrc" style="width: 60px;height: 60px;">
                        {{ item.method }}&nbsp;&nbsp;
                    </div>
                </el-tooltip>
            </el-scrollbar>
        </div>

        <!-- 超顶点的信息 -->
        <p>Node:</p> 
        <el-table :data="tableData" style="width: 98%" :header-cell-style="{ 'text-align': 'center' }" :cell-style= "{textAlign:'center'}"  border height="200px">
            <el-table-column prop="date" label="node" width="72" />
            <el-table-column prop="date" label="name" width="72" />
            <el-table-column prop="name" label="axisx" width="72" />
            <el-table-column prop="address" label="axisy" width="72"/>
        </el-table>

        <!-- 超边的信息 -->
        <p>Edge:</p> 
        <el-table :data="tableData" style="width: 98%" :header-cell-style="{ 'text-align': 'center' }" :cell-style= "{textAlign:'center'}"  border height="200px">
            <el-table-column prop="date" label="node" width="72" />
            <el-table-column prop="date" label="name" width="72" />
            <el-table-column prop="name" label="axisx" width="72" />
            <el-table-column prop="address" label="axisy" width="72"/>
        </el-table>

    </div>
</template>

<script scope>
import { reactive } from 'vue';
export default {
    setup() {
        const tableData = [
        {
            date: '2016',
            name: 'Tom',
            address: 'No.18',
        },
        {
            date: '2016',
            name: 'Tom',
            address: 'No.18',
        },
        {
            date: '2016',
            name: 'Tom',
            address: 'No.18',
        },
        {
            date: '2016',
            name: 'Tom',
            address: 'No.18',
        }
        ];
        const data = reactive({
            dataset_value:'',
            dataset_options:'',
            methodName:'',
        });
        const setmethods = [
            {method:"Split-complete", iconSrc:require('@/static/icon/1.png'), illstruate:"Split-complete"},
            {method:"Split-path", iconSrc:require('@/static/icon/2.png'), illstruate:"Split-path"},
            {method:"Split-cycle", iconSrc:require('@/static/icon/3.png'), illstruate:"Split-cycle"},
            {method:"Aggregate-collapse", iconSrc:require('@/static/icon/4.png'), illstruate:"Aggregate-collapse"},
            {method:"Aggregate-summarize", iconSrc:require('@/static/icon/5.png'), illstruate:"Aggregate-summarize"},
            {method:"Aggregate-relathionship-summarize",iconSrc:require('@/static/icon/6.png'), illstruate:"Aggregate-relathionship-summarize"},
            {method:"Centroid-within-layer",iconSrc:require('@/static/icon/7.png'), illstruate:"Centroid-within-layer"},
            {method:"Centroid-aggregate-relationship-summarize",iconSrc:require('@/static/icon/8.png'), illstruate:"Split-complete"},
            {method:"Centroid-aggregate-summarize",iconSrc:require('@/static/icon/9.png'), illstruate:"Split-complete"},
            {method:"Line-expansion",iconSrc:require('@/static/icon/10.png'), illstruate:"Split-complete"},
            {method:"Line-expansion-aggregate-summarize",iconSrc:require('@/static/icon/11.png'), illstruate:"Split-complete"},
            {method:"Line-expansion-aggregate-relationship-summarize",iconSrc:require('@/static/icon/12.png'), illstruate:"Split-complete"},
        ];

        function getMethodName(name){
            data.methodName = name;
        }
        return {
            tableData,
            data,
            setmethods,
            getMethodName
        };
    }
}
</script>

<style>
.title {
    font-family: Arial;
    font-size: larger;
    text-align: center;
    font-weight: bolder;
    align-items: center;
    /* 竖直方向，文字居中 */
}

.scrollbar-demo-item {
  display: flex;
  align-items: center;
  height: 80px;
  margin: 10px;
  text-align: center;
  border-radius: 4px;
  background: var(--el-color-primary-light-9);
  /* color: var(--el-color-primary); */
}

.scrollbar-demo-item:hover {
    position: relative;
    top: -1px;
    left: 0;
    box-shadow: 0px 5px 5px #c8c8c8;
    cursor:pointer;
}
.scrollbar-demo-item-active {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 80px;
    margin: 10px;
    text-align: center;
    border-radius: 4px;
    background:#9fcbe5;
    
}
.el-divider--vertical {
  display: inline-block;
  weight: 1px;
  height: 70%;
  margin: 0 8px;
  background: 0 0;
  border-left: 2px dashed #e8eaec;
  position: relative;
}

</style>