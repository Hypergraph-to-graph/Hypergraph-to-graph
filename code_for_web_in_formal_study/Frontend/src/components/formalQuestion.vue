<template>
    <div class="formal_questions">
        <el-form v-model="data.formal_study" label-width="430px" label-position="top">
            <!-- 单个题目 -->
            <el-form-item v-show="data.singleQuestion"> 
                <span class="form_font">{{data.questions[data.nowquestion]}}</span> 
                <div v-show="data.sameEdgeRadio">
                    <el-radio-group v-model="data.inSameEdge">
                        <el-radio label=1 size="large">YES</el-radio>
                        <el-radio label=0 size="large">NO</el-radio>
                    </el-radio-group>
                </div>
                <div v-show="data.finalQ" style="display: block; text-align: left;width: 99%;">
                    <el-input style="margin-top: 5px; width: 100%;" v-model="data.selftestAnswer"></el-input>
                </div>
            </el-form-item>
            <!-- 排序 -->
            <div v-show = "data.orderButtons">
                <el-form-item> 
                    <span class="form_font">&nbsp;current sort:{{ data.order }}</span> 
                </el-form-item>

                <el-button @click="sortMethod(item, i)" class="sort_button" style="display: inline-block;width: 180px; height: 40px;margin-bottom: 15px;margin-left: 13px;margin-right: 10px;" v-for="(item,i) in data.methodNames" :key="item.id" :disabled = data.order_button_disable[i]>
                    <span class = "item_font">
                        {{item.id}} {{item.name}}
                    </span>
                </el-button>
            </div>
            <!-- 实验自评 -->
            <div v-show = "data.selftest">
                <el-form-item> 
                    <span class="form_font">{{data.questions[data.nowquestion]}}</span> 
                    <el-radio-group v-model="data.judge.difficult">
                        <el-radio label="Very easy" size="large">Very easy</el-radio>
                        <el-radio label="Easy" size="large">Easy</el-radio>
                        <el-radio label="Moderate" size="large">Moderate</el-radio>
                        <el-radio label="Difficult" size="large">Difficult</el-radio>
                        <el-radio label="Very difficult" size="large">Very difficult</el-radio>
                    </el-radio-group>
                </el-form-item>

                <el-form-item> 
                    <span class="form_font">{{data.questions[data.nowquestion + 1]}}</span> 
                    <el-radio-group v-model="data.judge.speed">
                        <el-radio label="Very slow" size="large">Very slow</el-radio>
                        <el-radio label="Slow" size="large">Slow</el-radio>
                        <el-radio label="Moderate" size="large">Moderate</el-radio>
                        <el-radio label="Fast" size="large">Fast</el-radio>
                        <el-radio label="Very fast" size="large">Very fast</el-radio>
                    </el-radio-group>
                </el-form-item>

                <el-form-item> 
                    <span class="form_font">{{data.questions[data.nowquestion + 2]}}</span> 
                    <el-radio-group v-model="data.judge.correct">
                        <el-radio label="Very low correctness" size="large">Very low correctness</el-radio>
                        <el-radio label="Low correctness" size="large">Low correctness</el-radio>
                        <el-radio label="Moderate correctness" size="large">Moderate correctness</el-radio>
                        <el-radio label="High correctness" size="large">High correctness</el-radio>
                        <el-radio label="Very high correctness" size="large">Very high correctness</el-radio>
                    </el-radio-group>
                </el-form-item>
            </div>

            <!-- 重要程度评价-->
            <div v-show = "data.importantjudge">
                <el-form-item> 
                    <span class="form_font">{{data.questions[data.nowquestion]}}</span> 
                    <el-radio-group v-model="data.judgeimportance.judge1">
                        <el-radio label="Not at all" size="large">Not at all</el-radio>
                        <el-radio label="Low importance" size="large">Low importance</el-radio>
                        <el-radio label="Neutral" size="large">Neutral</el-radio>
                        <el-radio label="Important" size="large">Important</el-radio>
                        <el-radio label="Very important" size="large">Very important</el-radio>
                    </el-radio-group>
                </el-form-item>

                <el-form-item> 
                    <span class="form_font">{{data.questions[data.nowquestion + 1]}}</span> 
                    <el-radio-group v-model="data.judgeimportance.judge2">
                        <el-radio label="Not at all" size="large">Not at all</el-radio>
                        <el-radio label="Low importance" size="large">Low importance</el-radio>
                        <el-radio label="Neutral" size="large">Neutral</el-radio>
                        <el-radio label="Important" size="large">Important</el-radio>
                        <el-radio label="Very important" size="large">Very important</el-radio>
                    </el-radio-group>
                </el-form-item>

                <el-form-item> 
                    <span class="form_font">{{data.questions[data.nowquestion + 2]}}</span> 
                    <el-radio-group v-model="data.judgeimportance.judge3" v-if="data.nowquestion != 69">
                        <el-radio label="Not at all" size="large">Not at all</el-radio>
                        <el-radio label="Low importance" size="large">Low importance</el-radio>
                        <el-radio label="Neutral" size="large">Neutral</el-radio>
                        <el-radio label="Important" size="large">Important</el-radio>
                        <el-radio label="Very important" size="large">Very important</el-radio>
                    </el-radio-group>
                </el-form-item>
            </div>
            
        </el-form>
        <div style="text-align: center;">
            <el-button v-show="data.resetButtion" type="primary" size="large" @click="clearOrder()"> Reset </el-button>
            <el-button v-show="data.nextButtion || data.selftest" type="primary" size="large" @click="nextQuestion()"> Next </el-button>
            <el-button v-show="data.stepImage" type="primary" size="large" @click="readytoshow()"> Begin </el-button>
        </div>
    </div>
</template>

<script setup>
import {reactive, defineEmits} from 'vue'
import { useStore } from "vuex";
import { post } from '@/utils/request';

const store = useStore()
const data = reactive({
        is_formal_study: false,
        nowquestion:0,
        stepImage:true,
        setImageOrder:0,
        singleQuestion:true,
        resetButtion:false,
        nextButtion:false,
        orderButtons:false,
        selftest:false,
        sameEdgeRadio:false,
        importantjudge:false,
        finalQ:false,
        time:{
            settime:true,
            starttime:'',
            sendtime:''
        },
        order:'',
        order_submit:'',
        judge:{
            difficult:'',
            speed:'',
            correct:''
        },
        judgeimportance:{
            judge1:'',
            judge2:'',
            judge3:''
        },
        inSameEdge:false,
        selftestAnswer:'',
        order_button_disable:[false,false,false,false,false,false,false,false,false,false,false,false],
        formal_study:{
            index:0,
        },
        questions:[
            'E1-1. The following will present the Southern Women dataset, Please sort the 12 images in descending order of concavity.(Concavity: refers to the number of non-convex hyperedges)',
            'E1-2. The following will present the DBLP dataset, Please sort the 12 images in descending order of concavity.(Concavity: refers to the number of non-convex hyperedges)',
            'E1-3. The following will present the Co-Author dataset, Please sort the 12 images in descending order of concavity.(Concavity: refers to the number of non-convex hyperedges)',
            'E1-4. What do you think of the difficulty of each task?',
            'E1-5. What do you think of your speed when completing Experiment 1?',
            'E1-6. What do you think of the accuracy of your task completion?',

            'E2-1. The following will present the Southern Women dataset, Please sort the 12 images in descending order of planarity.(Planarity: Refers to the number of hyperedge intersections)',
            'E2-2. The following will present the DBLP dataset, Please sort the 12 images in descending order of planarity.(Planarity: Refers to the number of hyperedge intersections)',
            'E2-3. The following will present the Co-Author dataset, Please sort the 12 images in descending order of planarity.(Planarity: Refers to the number of hyperedge intersections)',
            'E2-4. What do you think of the difficulty of each task?',
            'E2-5. What do you think of your speed when completing Experiment 2?',
            'E2-6. What do you think of the accuracy of your task completion?',

            'E3-1. The following will present the Southern Women dataset, Please sort the 12 images in descending order of coverage.(Coverage: Refers to the ratio of the hypergraph to the canvas)',
            'E3-2. The following will present the DBLP dataset, Please sort the 12 images in descending order of coverage.(Coverage: Refers to the ratio of the hypergraph to the canvas)',
            'E3-3. The following will present the Co-Author dataset, Please sort the 12 images in descending order of coverage.(Coverage: Refers to the ratio of the hypergraph to the canvas)',
            'E3-4. What do you think of the difficulty of each task?',
            'E3-5. What do you think of your speed when completing Experiment 3?',
            'E3-6. What do you think of the accuracy of your task completion?',

            'E4-1. The following will present the Southern Women dataset, Please sort the 12 graphs from high to low according to the uniformity of the connection distance between nodes.',
            'E4-2. The following will present the DBLP dataset, Please sort the 12 graphs from high to low according to the uniformity of the connection distance between nodes.',
            'E4-3. The following will present the Co-Author dataset, Please sort the 12 graphs from high to low according to the uniformity of the connection distance between nodes.',
            'E4-4. What do you think of the difficulty of each task?',
            'E4-5. What do you think of your speed when completing Experiment 4?',
            'E4-6. What do you think of the accuracy of your task completion?',

            // 24
            // In the displayed hypergraph, whether OLIVIA and LAURA are in the same class in the framed area
            'E5-1-1. In the displayed hypergraph, whether OLIVIA and LAURA are in the same class',
            'E5-1-2. In the displayed hypergraph, whether EVELYN and LAURA are in the same class',
            'E5-1-3. In the displayed hypergraph, whether HELEN and VERNE are in the same class',
            'E5-1-4. In the displayed hypergraph, whether OLIVIA and FLORA are in the same class',
            'E5-1-5. In the displayed hypergraph, whether DOROTHY and MYRNA are in the same class',
            'E5-1-6. In the displayed hypergraph, whether ELEANOR and CHARLOTTE are in the same class',
            'E5-1-7. In the displayed hypergraph, whether RUTH and ELEANOR are in the same class',
            'E5-1-8. In the displayed hypergraph, whether EVELYN and BRENDA are in the same class',
            'E5-1-9. In the displayed hypergraph, whether NORA and OLIVIA are in the same class',
            'E5-1-10. In the displayed hypergraph, whether OLIVIA and DOROTHY are in the same class',
            'E5-1-11. In the displayed hypergraph, whether KATHERINE and DOROTHY are in the same class',
            'E5-1-12. In the displayed hypergraph, whether DOROTHY and FLORA are in the same class',
            'E5-2-1. In the displayed hypergraph, whether KB and AB are in the same class',
            'E5-2-2. In the displayed hypergraph, whether LA and LB are in the same class',
            'E5-2-3. In the displayed hypergraph, whether ZB and CA are in the same class',
            'E5-2-4. In the displayed hypergraph, whether EB and ZB are in the same class',
            'E5-2-5. In the displayed hypergraph, whether TA and IB are in the same class',
            'E5-2-6. In the displayed hypergraph, whether ZB and EB are in the same class',
            'E5-2-7. In the displayed hypergraph, whether JC and IA are in the same class',
            'E5-2-8. In the displayed hypergraph, whether HA and TB are in the same class',
            'E5-2-9. In the displayed hypergraph, whether NA and BA are in the same class',
            'E5-2-10. In the displayed hypergraph, whether EB and XA are in the same class',
            'E5-2-11. In the displayed hypergraph, whether HC and ZA are in the same class',
            'E5-2-12. In the displayed hypergraph, whether HC and JA are in the same class',
            'E5-3-1. In the displayed hypergraph, whether BC and YG are in the same class',
            'E5-3-2. In the displayed hypergraph, whether SO and KU are in the same class',
            'E5-3-3. In the displayed hypergraph, whether AU and CL are in the same class',
            'E5-3-4. In the displayed hypergraph, whether KE and IP are in the same class',
            'E5-3-5. In the displayed hypergraph, whether DA and YO are in the same class',
            'E5-3-6. In the displayed hypergraph, whether YO and DQ are in the same class',
            'E5-3-7. In the displayed hypergraph, whether BC and YG are in the same class',
            'E5-3-8. In the displayed hypergraph, whether BW and YO are in the same class',
            'E5-3-9. In the displayed hypergraph, whether YN and KE are in the same class',
            'E5-3-10. In the displayed hypergraph, whether IP and KE are in the same class',
            'E5-3-11. In the displayed hypergraph, whether LI and LA are in the same class',
            'E5-3-12.In the displayed hypergraph, whether SO and KR are in the same class',

            //33+ 66 -> 96 - 36
            'E5-4. What do you think of the difficulty of each task?',
            'E5-5. What do you think of your speed when completing Experiment 5?',
            'E5-6. What do you think of the accuracy of your task completion?',

            //36 + 66 -> 99 - 36
            'E6-1: Please rank according to your liking for the 12 output hypergraphs.(Now you can start considering the factors that you are particularly interested in.)',
            'E6-2: Please rank according to your liking for the 12 output hypergraphs.',
            'E6-3: Please rank according to your liking for the 12 output hypergraphs.',

            //39 + 66 -> 102 - 36
            'E6-4: Do you think it is important to lower concavity in hypergraph visualization?',
            'E6-5: Do you think it is important to improve planarity in hypergraph visualization?',
            'E6-6: Do you think it is important to improve coverage in hypergraph visualization?',
            'E6-7: Do you think it is important to the uniformity of distance between vertexes in hypergraph visualization?',
            'E6-8: Do you think “improving the cognitive ability related to data category” is vital to hypergraph visualization?',
            '',
            //
            'E6-9: Please list other visual factors you think are also important in hypergraph visualization.',
            'Testing has concluded. Thank you for your participation!'
        ],

        // questions:[
        //     'E1-1. The following will present the Southern Women dataset, Please sort the 12 images in descending order of concavity.(Concavity: refers to the number of non-convex hyperedges)',
        //     '实验1-1、下面将展示Southern Women数据集，请将12个图按照"凹度"从大到小的顺序排序（凹度：指非凸超边的数量）',
        //     '实验1-2、下面将展示DBLP数据集，请将12个图按照"凹度"从大到小的顺序排序（凹度：指非凸超边的数量）',
        //     '实验1-3、下面将展示Co-Author数据集，请将12个图按照"凹度"从大到小的顺序排序（凹度：指非凸超边的数量）',
        //     '实验1-4、你认为实验1中任务的难度是？',
        //     '实验1-5、你认为实验1中你完成任务的速度是？',
        //     '实验1-6、你认为实验1中你完成任务的正确性是？',

        //     '实验2-1、下面将展示Southern Women数据集，请将12个图按照"平面度"从大到小的顺序排序（平面度：指超边交叉的数量）',
        //     '实验2-2、下面将展示DBLP数据集，请将12个图按照"平面度"从大到小的顺序排序（平面度：指超边交叉的数量）',
        //     '实验2-3、下面将展示Co-Author数据集，请将12个图按照"平面度"从大到小的顺序排序（平面度：指超边交叉的数量）',
        //     '实验2-4、你认为实验2中任务的难度是？',
        //     '实验2-5、你认为实验2中你完成任务的速度是？',
        //     '实验2-6、你认为实验2中你完成任务的正确性是？',

        //     '实验3-1、下面将展示Southern Women数据集，请将12个图按照"覆盖率"从大到小的顺序排序（覆盖率：指超图占画布的比率）',
        //     '实验3-2、下面将展示DBLP数据集，请将12个图按照"覆盖率"从大到小的顺序排序（覆盖率：指超图占画布的比率）',
        //     '实验3-3、下面将展示Co-Author数据集，请将12个图按照"覆盖率"从大到小的顺序排序（覆盖率：指超图占画布的比率）',
        //     '实验3-4、你认为实验3中任务的难度是？',
        //     '实验3-5、你认为实验3中你完成任务的速度是？',
        //     '实验3-6、你认为实验3中你完成任务的正确性是？',

        //     // 18
        //     '实验4-1、下面将展示Southern Women数据集，请将12个图按照"节点间连线距离的均匀程度"从大到小的顺序排序',
        //     '实验4-2、下面将展示DBLP数据集，请将12个图按照"节点间连线距离的均匀程度"从大到小的顺序排序',
        //     '实验4-3、下面将展示Co-Author数据集，请将12个图按照"节点间连线距离的均匀程度"从大到小的顺序排序',
        //     '实验4-4、你认为实验4中任务的难度是？',
        //     '实验4-5、你认为实验4中你完成任务的速度是？',
        //     '实验4-6、你认为实验4中你完成任务的正确性是？',

        //     // 24
        //     '实验5-1-1、在当前Southern Women数据集中，VERNE 和 RUTH是否在一个类里1',
        //     '实验5-1-2、在当前Southern Women数据集中，EVELYN和LAURA是否在一个类里1',
        //     '实验5-1-3、在当前Southern Women数据集中，HELEN和VERNE是否在一个类里1',
        //     '实验5-1-4、在当前Southern Women数据集中，OLIVIA和FLORA是否在一个类里1',
        //     '实验5-1-5、在当前Southern Women数据集中，DOROTHY和MYRNA是否在一个类里1',
        //     '实验5-1-6、在当前Southern Women数据集中，ELEANOR和CHARLOTTE是否在一个类里1',
        //     '实验5-1-7、在当前Southern Women数据集中，RUTH和ELEANOR是否在一个类里1',
        //     '实验5-1-8、在当前Southern Women数据集中，EVELYN和BRENDA是否在一个类里1',
        //     '实验5-1-9、在当前Southern Women数据集中，NORA和OLIVIA是否在一个类里1',
        //     '实验5-1-10、在当前Southern Women数据集中，OLIVIA和DOROTHY是否在一个类里1',
        //     '实验5-1-11、在当前Southern Women数据集中，KATHERINE和DOROTHY是否在一个类里1',
        //     '实验5-1-12、在当前Southern Women数据集中，DOROTHY和FLORA是否在一个类里1',
        //     '实验5-2-1、在当前DBLP数据集中，KB和AB是否在一个类里',
        //     '实验5-2-2、在当前DBLP数据集中，LA和LB是否在一个类里',
        //     '实验5-2-3、在当前DBLP数据集中，ZB和CA是否在一个类里',
        //     '实验5-2-4、在当前DBLP数据集中，EB和ZB是否在一个类里',
        //     '实验5-2-5、在当前DBLP数据集中，TA和IB是否在一个类里',
        //     '实验5-2-6、在当前DBLP数据集中，ZB和EB是否在一个类里',
        //     '实验5-2-7、在当前DBLP数据集中，JC和IA是否在一个类里',
        //     '实验5-2-8、在当前DBLP数据集中，HA和TB是否在一个类里',
        //     '实验5-2-9、在当前DBLP数据集中，NA和BA是否在一个类里',
        //     '实验5-2-10、在当前DBLP数据集中，EB和XA是否在一个类里',
        //     '实验5-2-11、在当前DBLP数据集中，HC和ZA是否在一个类里',
        //     '实验5-2-12、在当前DBLP数据集中，HC和JA是否在一个类里',
        //     '实验5-3-1、在当前Co-Author数据集中，BC和YG是否在一个类里',
        //     '实验5-3-2、在当前Co-Author数据集中，SO和KU是否在一个类里',
        //     '实验5-3-3、在当前Co-Author数据集中，AU和CL是否在一个类里',
        //     '实验5-3-4、在当前Co-Author数据集中，KE和IP是否在一个类里',
        //     '实验5-3-5、在当前Co-Author数据集中，DA和YO是否在一个类里',
        //     '实验5-3-6、在当前Co-Author数据集中，YO和DQ是否在一个类里',
        //     '实验5-3-7、在当前Co-Author数据集中，BC和YG是否在一个类里',
        //     '实验5-3-8、在当前Co-Author数据集中，BW和YO是否在一个类里',
        //     '实验5-3-9、在当前Co-Author数据集中，YN和KE是否在一个类里',
        //     '实验5-3-10、在当前Co-Author数据集中，IP和KE是否在一个类里',
        //     '实验5-3-11、在当前Co-Author数据集中，LI和LA是否在一个类里',
        //     '实验5-3-12、在当前Co-Author数据集中，SO和KR是否在一个类里',

        //     //33 + 66 -> 96 - 36
        //     '实验5-4、你认为实验5中任务的难度是？',
        //     '实验5-5、你认为实验5中你完成任务的速度是？',
        //     '实验5-6、你认为实验5中你完成任务的正确性是？',

        //     //36 + 66 -> 99 - 36
        //     '问题1：请根据你对输出的12个超图的喜爱程度进行排名（可以就此开始思考您重点关注的因素有哪些）',
        //     '问题2：请根据你对输出的12个超图的喜爱程度进行排名',
        //     '问题3：请根据你对输出的12个超图的喜爱程度进行排名',

        //     //39 + 66 -> 102 - 36
        //     '问题4：你认为"降低凹度"对超图可视化是否重要?',
        //     '问题5：你认为"提高平面度"对超图可视化是否重要?',
        //     '问题6：你认为"提高覆盖率"对超图可视化是否重要?',
        //     '问题7：你认为"提高节点间距离的均匀程度"对超图可视化是否重要?',
        //     '问题8：你认为"提高对数据的认知能力"对超图可视化是否重要?',
        //     '',
        //     //
        //     '问题10：请你列出你认为对超图可视化影响较大的其他因素',
        //     '测试结束，感谢您的参与！'
        // ],

        methodNames:[
            {'name':'split1','id':'①','index':'1'},
            {'name':'split2','id':'②','index':'2'},
            {'name':'split3','id':'③','index':'3'},
            {'name':'Aggregate1','id':'④','index':'4'},
            {'name':'Aggregate2','id':'⑤','index':'5'},
            {'name':'Aggregate3','id':'⑥','index':'6'},
            {'name':'Centroid1','id':'⑦','index':'7'},
            {'name':'Centroid2','id':'⑧','index':'8'},
            {'name':'Centroid3','id':'⑨','index':'9'},
            {'name':'Line_expansion1','id':'⑩','index':'10'},
            {'name':'Line_expansion2','id':'⑪','index':'11'},
            {'name':'Line_expansion3','id':'⑫','index':'12'},
        ]

    })
const emit = defineEmits(['show_images'])

function nextQuestion(){
    if(data.time.settime == true){
        data.time.settime = false
        data.time.sendtime = new Date() - data.time.starttime
    }
    data.nowquestion ++
    data.stepImage = true
    data.nextButtion = false
    data.resetButtion = false
    data.orderButtons = false
    data.sameEdgeRadio = false
    //发送参数
    var req = { id:store.state.id, nowquestion:data.nowquestion-1, data:data.order_submit, time: data.time.sendtime}

    //每个实验结束后开始自测
    if(data.nowquestion == 3 || data.nowquestion == 9 || data.nowquestion == 15 || data.nowquestion == 21 || data.nowquestion == 60){
       data.singleQuestion = false
       data.stepImage = false
       data.selftest = true
    }
    //提交自测开始回答后面问题
    if(data.nowquestion == 4 || data.nowquestion == 10 || data.nowquestion == 16 || data.nowquestion == 22 || data.nowquestion == 61){
        data.nowquestion += 2
        data.singleQuestion = true
        data.selftest = false
        req.data = {
            difficult:data.judge.difficult,
            speed:data.judge.speed,
            correct:data.judge.correct
        }
    }
    //是否在一个类中
    if(data.nowquestion > 24 && data.nowquestion <= 60){
        req.data = data.inSameEdge
    }
    var ready = false
    if(data.nowquestion >= 63 && data.nowquestion <= 65){
        data.setImageOrder ++
        data.stepImage = false
        data.nextButtion = true
        data.orderButtons = true
        data.resetButtion = true
        ready = true
    }
    if(data.nowquestion == 67){
        data.nowquestion += 2
        req.data = data.judgeimportance
    }
    if(data.nowquestion == 66 || data.nowquestion == 69){
        data.importantjudge = true
        data.singleQuestion = false
        data.stepImage = false
        data.nextButtion = true
    }
    if(data.nowquestion == 70){
        data.nowquestion += 2
        data.singleQuestion = true
        data.importantjudge = false
        data.stepImage = false
        data.nextButtion = true
        data.finalQ = true
        req.data = data.judgeimportance
    }
    if(data.nowquestion == 73){
        data.finalQ = false
        data.stepImage = false
        req.data = data.selftestAnswer
    }
    
    post('/answer', req).then(res=>{
        cleanRadio()
    })
    show_images(ready)
    clearOrder()
}
function cleanRadio(){
    data.judge.difficult ='',
    data.judge.speed =''
    data.judge.correct =''
    data.judgeimportance.judge1 =''
    data.judgeimportance.judge2 =''
    data.judgeimportance.judge3 =''
    data.selftestAnswer = ''
}

function sortMethod(item, i){
    if(data.order == '(Please click the following buttons to sort)'){
        data.order = ''
        data.order_submit = ''
    }
        
    data.order = data.order + item.id + ' '
    data.order_submit = data.order_submit + item.index + ' '
    data.order_button_disable[i] = true
}
function clearOrder(){
    data.order = '(Please click the following buttons to sort)'
    data.order_submit = ''
    data.order_button_disable = [false,false,false,false,false,false,false,false,false,false,false,false]
}
//控制看完题目之后展示内容,方便计时
function readytoshow(){
    data.stepImage = false
    data.resetButtion = true
    data.nextButtion = true
    data.orderButtons = true
    data.time.settime = true
    data.time.starttime = new Date()
    if(data.nowquestion >= 24 && data.nowquestion <= 96){
        data.resetButtion = false
        data.orderButtons = false
        data.sameEdgeRadio = true
    }
    show_images(true)
}

function show_images(is_ready){
    if(is_ready == true){
        data.setImageOrder ++
    }
    let param={
        setImageOrder:data.setImageOrder - 1,
        setNowQuestion: data.nowquestion,
        ready:is_ready
    }
    emit('show_images', param)
}
</script>

<style>
.formal_questions{
    display: block;
    text-align: left;
}
.form_font{
    font-size: 20px;
    font-family:'Times New Roman', Times, serif;
}
.item_font{
    font-size: 17px;
    font-family:'Times New Roman', Times, serif;
}
</style>