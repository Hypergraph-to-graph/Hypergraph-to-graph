<template>
<div class="affix-container">
        <el-card :class= "data.pre_study.is_used === 'Yes' ? 'el_card1' : 'el_card2'">
            <div class="dataTitle">
                <el-divider style="border-top: 2px dashed #cacbcc; margin: 20px 0; width: 90%; display: inline-block;">
                <span class="title-font">Formal-study</span>
                </el-divider>
                <div style="height: 30px;"><span style="float: right;">Question:{{ data.nowquestion }}/72 &nbsp; &nbsp;Time: {{ data.newTime }}</span></div>
                <div class="pre_questions" v-if="data.is_pre_study">
                    <el-form v-model="data.pre_study" label-width="300px" label-position="top">
                        <el-form-item> 
                            <span class="form_font">1. Please select the range of your age.</span> 
                            <el-radio-group v-model="data.pre_study.age">
                                <el-radio label="1120" size="large">11-20</el-radio>
                                <el-radio label="2130" size="large">21-30</el-radio>
                                <el-radio label="3140" size="large">31-40</el-radio>
                                <el-radio label="4150" size="large">41-50</el-radio>
                                <el-radio label="5160" size="large">51-60</el-radio>
                                <el-radio label="60" size="large">60+</el-radio>
                            </el-radio-group>
                            <span class="form_font">2.  Please select your gender. &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                            <el-radio-group v-model="data.pre_study.gender">
                                <el-radio label="male" size="large">Male</el-radio>
                                <el-radio label="female" size="large">Female</el-radio>
                            </el-radio-group>
                            
                            <span class="form_font">3. Please specify your major or your research field.</span>
                            <el-input style="margin-top: 5px;" v-model="data.pre_study.research_field"></el-input>

                            <span class="form_font">4. Are you familiar with visualization?</span>
                            <el-radio-group v-model="data.pre_study.is_familiar">
                                <el-radio label="Very unfamiliar" size="large">Very unfamiliar</el-radio>
                                <el-radio label="Unfamiliar" size="large">Unfamiliar</el-radio>
                                <el-radio label="Moderately familiar" size="large">Moderately familiar</el-radio>
                                <el-radio label="Familiar" size="large">Familiar</el-radio>
                                <el-radio label=">Very familiar" size="large">Very familiar</el-radio>
                            </el-radio-group>

                            <span class="form_font">5. Have you learned about hypergraph or used them in your work or research? </span>
                            <el-radio-group v-model="data.pre_study.is_used">
                                <el-radio label="Yes" size="large">Yes</el-radio>
                                <el-radio label="No" size="large">No</el-radio>
                                <div v-if="data.pre_study.is_used == 'Yes'" style="display: block; text-align: left;">
                                    <span class="form_font">5-1. please share us with the usage, the usage scenario, the purpose of usage, as well as the difficulties and dissatisfaction that you have confronted.</span>
                                    <el-input style="margin-top: 2px;" v-model="data.pre_study.introduce"></el-input>
                                </div>
                            </el-radio-group>
                        </el-form-item>
                    </el-form>
                    <el-button type="primary" size="large" @click="confirmPrestudy()"> Next </el-button>
                </div>
                <formalQuestion @show_images="show_images" v-if="data.is_formal_study"></formalQuestion>
            </div>
        </el-card>

    <div style="display: float-right;">
        <div v-if="data.showname">
            <div style="width:270px;   display: inline-block;">Current dataset:{{ datasetName }} </div>
            <span>method:{{ methodName }}</span>
        </div>
        <!-- <el-button @click="startGetdataset()">点击开始</el-button> -->
        <!-- <div id="mountNode" style="width: 1040px; height: 600px; margin: 0; padding: 0; display: block;"></div> -->
        
        <!-- 展示画出的超图图片 展示所有 -->
        <div style="float: left; width: 80%;" v-if="data.show_images1">
            <div v-for="(item, i) in imagesUrl[data.formal_study_index]" :key="item" class="hyperImage" :style="{ 'background-image': 'url(' + item + ')', 'background-repeat':'no-repeat','background-size':'cover'}">
                <el-button color="#000" style="width:32px;height: 32px;margin-left: 8px ;margin-top: 5px ;" circle>{{ i+1 }}</el-button>
            </div>
        </div>
    </div>
    <!-- 展示画出的超图图片 展示一个  -->
    <div style="float: center; width: 1050px; margin-left: 80px; " v-if = "data.show_images2">
    <!-- <div style="float: center; width: 1050px; margin-left: 250px; " v-if = "data.show_images2"> -->
        <div :style="{'width':'820px','height':'820px','background-image': 'url(' + data.itemUrl + ')', 'background-repeat':'no-repeat','background-size':'cover'}"></div>
    </div>
</div>
</template>

<!-- 引入在线资源 -->
<script setup>
import {split1, split2, split3, Aggregate1, Aggregate2, Aggregate3, Centroid1, Centroid2, Centroid3, Line_expansion1, Line_expansion2, Line_expansion3} from '@/static/transform'
import { desplit, disAggregate1, disAggregate2,disCentroid1,disCentroid2, disExpansion1,disExpansion2 } from '@/static/retransform'
import {mygraph} from '@/static/graph'
import {datasets} from '@/static/datasets'
import formalQuestion from '@/components/formalQuestion.vue'
import { useStore } from "vuex";
import { get, post } from '@/utils/request';

import G6 from '@antv/g6';
import {toRefs, reactive, onMounted} from 'vue'

    const data = reactive({
        userId:'',
        showname:true,
        newTime:'',
        dataName:'',
        is_pre_study:true,
        is_formal_study: false,
        show_images_id:[0,1,2,0,1,2,0,1,2,0,1,2,0,0,1,1,2,2,0,1,2],
        show_images:[],
        show_images1:false,
        show_images2:false,
        itemUrl:'',
        time:{
            hour:0,
            minute:0,
            second:0,
        },
        nowquestion:0,
        pre_study:{
            age:'',
            gender:'',
            research_field:'',
            is_familiar:'',
            is_used:'',
            introduce:'',
        },
        formal_study_index:0
    })
    //获取数据集和转换方法
    const props = defineProps({
        datasetName:"",
        methodName:""
    })
    const {datasetName, methodName} = toRefs(props)
    const emit = defineEmits(['questionindex']);

    const show_images = (val)=>{
        data.show_images = val
        data.nowquestion = val.setNowQuestion + 1 
        if(val.setNowQuestion == 72 ){
            data.nowquestion = data.nowquestion - 1
        }
        getImageUrl(val)
    }

    function getImageUrl(val){
        //手动选择数据集
        // if(datasetName.value == "Southern Women"){
        //     data.formal_study_index = 0
        // }else if(datasetName.value == "DBLP"){
        //     data.formal_study_index = 1
        // }else if(datasetName.value == "Co-Author Network"){
        //     data.formal_study_index = 2
        // }else{
        //     data.formal_study_index = null
        // }
        if(val.setImageOrder < 12){
            data.show_images1 = val.ready
            data.show_images2 = false
            data.formal_study_index = data.show_images_id[val.setImageOrder]
        }else if(val.setImageOrder < 48){
            data.show_images1 = false
            data.show_images2 = val.ready
            var index = (val.setImageOrder-12) / 12
            var index2 = (val.setImageOrder-12) % 12
            data.itemUrl = imagesUrl2[Math.floor(index)][Math.floor(index2)]
        }else{
            data.show_images1 = val.ready
            data.show_images2 = false
            data.formal_study_index = data.show_images_id[val.setImageOrder - 36]
        }
    }

    var mydatasets = new datasets()
    var select_edges = []
    var select_nodes = []
    var tran_edges = []
    var tran_nodes = []
    var G6_graph = []
    const mycolor = [
            '#df9e9b',
            '#99badf',
            '#d8e7ca',
            '#99cdce',
            '#999acd',
            '#ffd0e9'
    ]  
    const imagesUrl = [
        [
            require('@/assets/images/1-1.png'),
            require('@/assets/images/1-2.png'),
            require('@/assets/images/1-3.png'),
            require('@/assets/images/1-4.png'),
            require('@/assets/images/1-5.png'),
            require('@/assets/images/1-6.png'),
            require('@/assets/images/1-7.png'),
            require('@/assets/images/1-8.png'),
            require('@/assets/images/1-9.png'),
            require('@/assets/images/1-10.png'),
            require('@/assets/images/1-11.png'),
            require('@/assets/images/1-12.png'),
        ],
        [
            require('@/assets/images/2-1.png'),
            require('@/assets/images/2-2.png'),
            require('@/assets/images/2-3.png'),
            require('@/assets/images/2-4.png'),
            require('@/assets/images/2-5.png'),
            require('@/assets/images/2-6.png'),
            require('@/assets/images/2-7.png'),
            require('@/assets/images/2-8.png'),
            require('@/assets/images/2-9.png'),
            require('@/assets/images/2-10.png'),
            require('@/assets/images/2-11.png'),
            require('@/assets/images/2-12.png'),
        ],
        [
            require('@/assets/images/3-1.png'),
            require('@/assets/images/3-2.png'),
            require('@/assets/images/3-3.png'),
            require('@/assets/images/3-4.png'),
            require('@/assets/images/3-5.png'),
            require('@/assets/images/3-6.png'),
            require('@/assets/images/3-7.png'),
            require('@/assets/images/3-8.png'),
            require('@/assets/images/3-9.png'),
            require('@/assets/images/3-10.png'),
            require('@/assets/images/3-11.png'),
            require('@/assets/images/3-12.png'),
        ]
        
    ]

    const imagesUrl2 = [
        [
            require('@/assets/images/1-1.png'),
            require('@/assets/images/1-2.png'),
            require('@/assets/images/1-3.png'),
            require('@/assets/images/1-4.png'),
            require('@/assets/images/1-5.png'),
            require('@/assets/images/1-6.png'),
            require('@/assets/images/1-7.png'),
            require('@/assets/images/1-8.png'),
            require('@/assets/images/1-9.png'),
            require('@/assets/images/1-10.png'),
            require('@/assets/images/1-11.png'),
            require('@/assets/images/1-12.png'),
        ],
        [
            require('@/assets/images/5-2-1.png'),
            require('@/assets/images/5-2-2.png'),
            require('@/assets/images/5-2-3.png'),
            require('@/assets/images/5-2-4.png'),
            require('@/assets/images/5-2-5.png'),
            require('@/assets/images/5-2-6.png'),
            require('@/assets/images/5-2-7.png'),
            require('@/assets/images/5-2-8.png'),
            require('@/assets/images/5-2-9.png'),
            require('@/assets/images/5-2-10.png'),
            require('@/assets/images/5-2-11.png'),
            require('@/assets/images/5-2-12.png')
        ],
        [
            require('@/assets/images/5-3-1.png'),
            require('@/assets/images/5-3-2.png'),
            require('@/assets/images/5-3-3.png'),
            require('@/assets/images/5-3-4.png'),
            require('@/assets/images/5-3-5.png'),
            require('@/assets/images/5-3-6.png'),
            require('@/assets/images/5-3-7.png'),
            require('@/assets/images/5-3-8.png'),
            require('@/assets/images/5-3-9.png'),
            require('@/assets/images/5-3-10.png'),
            require('@/assets/images/5-3-11.png'),
            require('@/assets/images/5-3-12.png')
        ]
        
    ]

    function startGetdataset(){
        select_edges = []
        select_nodes = []
        tran_edges = []
        tran_nodes = []
        G6_graph = []
        getDataset()
        var g = new mygraph(select_nodes,[],select_edges)
        getMethod(g)
        drawGraph(g)
    }

    //选择数据集
    function getDataset(){
        if(datasetName.value == "Southern Women"){
            select_edges = mydatasets.edgesOfsouthern_women
            select_nodes = mydatasets.nodesOfsouthern_women
        }else if(datasetName.value == "DBLP"){
            select_edges = mydatasets.edgesOfDBLP
            select_nodes = mydatasets.nodesOfDBLP
        }else if(datasetName.value == "Co-Author Network"){
            select_edges = mydatasets.edgesOfco_auther
            select_nodes = mydatasets.nodesOfco_auther
        }else{
            select_edges = []
            select_nodes = []
        }
    }

    //选择转换方法进行转换
    function getMethod(g){
        switch(methodName.value){
            case "Split-complete": {split1(g), tran_nodes= g.nodes, tran_edges= g.links}break;
            case "Split-path": {split2(g), tran_nodes= g.nodes, tran_edges= g.links}break;
            case "Split-cycle": {split3(g), tran_nodes= g.nodes, tran_edges= g.links}break;
            case "Aggregate1": {Aggregate1(g), tran_nodes = g.aggregate_nodes, tran_edges = g.aggregate_links}break;
            case "Aggregate2": {Aggregate2(g), tran_nodes = g.aggregate_nodes, tran_edges = g.aggregate_links}break;
            case "Aggregate3": {Aggregate3(g), tran_nodes = g.aggregate_nodes, tran_edges = g.aggregate_links}break;
            case "Centroid1": {Centroid1(g), tran_nodes = g.centroid_nodes, tran_edges = g.centroid_links}break;
            case "Centroid2": {Centroid2(g), tran_nodes = g.centroid_nodes, tran_edges = g.centroid_links}break;
            case "Centroid3": {Centroid3(g), tran_nodes = g.centroid_nodes, tran_edges = g.centroid_links}break;
            case "expansion1": {Line_expansion1(g),tran_nodes = g.line_expansion_nodes, tran_edges = g.line_expansion_links}break;
            case "expansion2": {Line_expansion2(g),tran_nodes = g.line_expansion_nodes, tran_edges = g.line_expansion_links}break;
            case "expansion3": {Line_expansion3(g),tran_nodes = g.line_expansion_nodes, tran_edges = g.line_expansion_links}break;
        }
    }

    //画图+后处理
    function drawGraph(g){
        //输入数据集的要求
        // nodes id 和label都要是string类型
        // var nodes = [{id:"1", label:"1"},{id:"2", label:"2"},{id:"3", label:"3"},{id:"4", label:"4"},{id:"5", label:"5"}];
        // var hedges = [[ 1, 2 ],[ 1, 2, 3 ],[ 3, 4, 5 ]];
        //使用G6把图画出来
        var data = {nodes:tran_nodes,  edges:tran_edges}
        var graph = new G6.Graph({
            container: 'mountNode',
            width: 1020,
            height: 1020,
            fitView:true,
            layout: {
                type: 'fruchterman',
                gravity: 15,
                preventOverlap: true,
            },
            defaultNode: {
                size: [10, 10],
                // size: [15, 15],
                // size: [25, 25],
                // size: [17, 17],
                color: '#486995',
                labelCfg: {
                    // position: 'center',
                    position: 'bottom',
                    offset: 5,
                    style:{
                        // fontSize:10,
                        fontSize:8
                    }
                },
                style: {
                    lineWidth: 2,
                    fill: '#ecf2f7'
                },
                shape: 'circle'
            },
            defaultEdge: {
                size: 0.0000000001,
                color: '#a0bfed'
            }
        });
        graph.data(data);
        graph.render();
        //后处理
        var nodes = []
        var edges = []
        var allEdgeModels = []
        var allNodeModels = []
        setTimeout(() => {
            nodes = graph.getNodes();
            edges = graph.getEdges();
            switch(methodName.value){
                case "Split-complete":;
                case "Split-path":;
                case "Split-cycle":break;
                case "Aggregate1": [allEdgeModels, allNodeModels] = disAggregate1(nodes, edges, g);break;
                case "Aggregate2":;
                case "Aggregate3": [allEdgeModels, allNodeModels] = disAggregate2(nodes, edges, g);break;
                case "Centroid1": [allEdgeModels, allNodeModels] = disCentroid1(nodes, edges, g);break;
                case "Centroid2":;
                case "Centroid3": [allEdgeModels, allNodeModels] = disCentroid2(nodes, edges, g);break;
                case "expansion1": [allEdgeModels, allNodeModels] = disExpansion1(nodes, edges, g);break;
                case "expansion2":;
                case "expansion3": [allEdgeModels, allNodeModels] = disExpansion2(nodes, edges, g);break;
            }
            if(methodName.value != "Split-complete" && methodName.value != "Split-path" && methodName.value !="Split-cycle" && methodName.value !="Centroid1"){
                graph.changeData({
                    nodes: allNodeModels,
                    edges: allEdgeModels
                });
            }

            //得到后处理后的点的坐标，画气泡集
            setTimeout(() => {
                // 方法区
                //文档形式保存点坐标
                var tempnodes = graph.getNodes()
                G6_graph = []
                // var mycontext = ""
                for(var i = 0; i < tempnodes.length; i++){
                    // G6_graph.push({id:tempnodes[i]._cfg.id, x:Math.round(tempnodes[i]._cfg.model.x*1.2 - 50), y:Math.round(tempnodes[i]._cfg.model.y*1.2 - 100)})
                    G6_graph.push({id:tempnodes[i]._cfg.id, x:Math.round(tempnodes[i]._cfg.model.x*0.7 + 120), y:Math.round(tempnodes[i]._cfg.model.y*0.7 + 120)})
                    // G6_graph.push({id:tempnodes[i]._cfg.id, x:Math.round(tempnodes[i]._cfg.model.x ), y:Math.round(tempnodes[i]._cfg.model.y)})
                }
                var final_node_model = []
                var final_edge_model = []
                if(methodName.value !="Centroid1"){
                    tempnodes.forEach(function(n, i) {
                        var model = n.getModel();
                        model.fixed = true;
                        model.fx = G6_graph[i].x;
                        model.fy = G6_graph[i].y;
                        final_node_model.push(model);
                    });
                    split3(g)
                    g.links.forEach(function(e) {
                        final_edge_model.push(e);
                    });
                }else{
                    final_node_model = allNodeModels
                    final_edge_model = allEdgeModels
                }
                
                graph.changeData({
                    nodes: final_node_model,
                    edges: final_edge_model
                });
                    graph.on('afterlayout', () => {
                        for(var i = 0; i < g.hyperedges.length; i++){
                            const hull1 = graph.createHull({
                                id: i,
                                type: 'bubble',
                                members: g.hyperedges[i],
                                style: {
                                    fill: mycolor[i%6],
                                    stroke: mycolor[i%6],
                                    opacity:0.5,
                                },
                                padding: 8,
                            });
                            hull1.updateData(hull1.members);
                        }
                    });
            }, 12000);
        }, 6000);
    }

    const store = useStore()
    async function confirmPrestudy(){
        data.showname = false
        emit('questionindex', false)
        data.nowquestion = 1
        post('/identity', data.pre_study).then(res=>{
            store.commit('SettingUId',res.data)
            data.is_pre_study = false
            data.is_formal_study = true
            data.pre_study.is_used = 'No'
        })
    }
    function complZero(n) {
      return n < 10 ? "0" + n : "" + n;
    }

    function getTime(){
        data.time.second = data.time.second + 1;
        if (data.time.second >= 60) {
            data.time.second = 0;
            data.time.minute = data.time.minute + 1;
        }

        if (data.time.minute >= 60) {
            data.time.minute = 0;
            data.time.hour = data.time.hour + 1;
        }
        data.newTime =
            complZero(data.time.hour) +
            ":" +
            complZero(data.time.minute) +
            ":" +
            complZero(data.time.second);
    }
    onMounted(()=>{
        getTime();//进入页面调用该方法获取当前时间
        clearInterval(myTimeDisplay );//销毁之前定时器
        var myTimeDisplay = setInterval(() => {
            getTime()
        }, 1000);    
    })

</script>

<style scoped lang="scss">
.el_card1{
    position: fixed;
    right: 15px;
    width: 450px;
    height: 810px;
    bottom: 15px;
}

.el_card2{
    position: fixed;
    right: 15px;
    width: 450px;
    height: 690px;
    bottom: 15px;
}
.form_font{
    font-size: 20px;
    font-family:'Times New Roman', Times, serif;
    text-align: left;
}
.pre_question{
    display: block;
}

.affix-container{
    height: 890px;
}
.hyperImage{
    float: left;
    border: 1px dashed #cacbcc;
    width: 330px;
    height: 330px;
    margin-right: 17px ;
    margin-top: 5px ;
}
.imgs{
    width: 90%;
    height: 90%;
    object-fit: cover;
}
.button_style{
    width: 20px;
    height: 20px;
    margin-right: 5px ;
    margin-top: 5px ;
}

</style>