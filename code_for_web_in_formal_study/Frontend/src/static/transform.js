
function split1(graph){
    for (let k = 0; k < graph.hyperedges.length; k++){
        var h_edge = graph.hyperedges[k];
        for (let i = 0; i < h_edge.length - 1; i++){
            for (let j = i + 1; j < h_edge.length; j++){
                graph.addLinks({source: h_edge[i].toString(), target: h_edge[j].toString()})
            }
        }
    }
}

function split2(graph){
    for (let i = 0; i < graph.hyperedges.length; i++){
        for (let j = 0; j < graph.hyperedges[i].length - 1; j++){
            graph.addLinks({source: graph.hyperedges[i][j].toString(), target: graph.hyperedges[i][j+1].toString()})
        }
    }
}

function split3(graph){
    graph.links = []
    for (let i = 0; i < graph.hyperedges.length; i++){
        for (let j = 0; j < graph.hyperedges[i].length; j++){
            if(j != graph.hyperedges[i].length - 1){
                graph.addLinks({"source": graph.hyperedges[i][j].toString(), "target": graph.hyperedges[i][j+1].toString(), "id":i+'+'+j})
            }else{
                graph.addLinks({"source": graph.hyperedges[i][j].toString(), "target": graph.hyperedges[i][0].toString(), "id":i+'+'+j})
            }
        }
    }
}

function Aggregate1(graph){
    for (let i = 0; i < graph.hyperedges.length; i++){
        //[4,5,6] => '456',做为id
        // var a_node = {"id":graph.hyperedges[i].toString().replace(/,/g,"")}
        // 点的label可以设置一下
        var a_node = {"id":graph.hyperedges[i].toString(),"label":i.toString()}
        graph.addAggregateNode(a_node)
    }
    var index = 0
    for (let i = 0; i < graph.hyperedges.length; i++){
        var n_hyperedges = graph.hyperedges[i]
        for (let j = 0; j < n_hyperedges.length; j++){
            for(let k = i + 1; k < graph.hyperedges.length; k++){
                var link = graph.hyperedges[k].find((obj) => {
                    return obj ==  n_hyperedges[j]
                })
                if(link != undefined){
                    var aggregate_link = {"source": graph.aggregate_nodes[i].id, "target": graph.aggregate_nodes[k].id,id:index}
                    index ++
                    graph.addAggregateLink(aggregate_link)
                }
            }
        }
    }
    duplicateRemoval(graph.aggregate_links);
}

function Aggregate2(graph){
    for (let i = 0; i < graph.nodes.length-1; i+=2){
        //'4,5',做为id
        var a_node = {"id":graph.nodes[i].id.toString() + "," + graph.nodes[i+1].id.toString(), "label": graph.nodes[i].id.toString() + "," + graph.nodes[i+1].id.toString()}
        graph.addAggregateNode(a_node)
    }
    if(graph.nodes.length % 2 == 1){
        var a_node = {"id":graph.nodes[graph.nodes.length-1].id.toString(), "label": graph.nodes[graph.nodes.length-1].id.toString()}
        graph.addAggregateNode(a_node)
    }
    addAggregateLink(graph)
}

function Aggregate3(graph){
    //聚合点
    var n_nodes = JSON.parse(JSON.stringify(graph.nodes));
    for (let i = 0; i < n_nodes.length; i++){
        var newId = n_nodes[i].id.toString()
        for (let j = i + 1; j < n_nodes.length; j++){
            var tag_is_same = 1
            for(let k = 0; k < graph.hyperedges.length; k++){
                var find_a = graph.hyperedges[k].find((obj)=>{
                    return obj == n_nodes[i].id
                })
                var find_b = graph.hyperedges[k].find((obj)=>{
                    return obj == n_nodes[j].id
                })
                if((find_a == undefined && find_b != undefined) || (find_a != undefined && find_b == undefined)){
                    tag_is_same = 0
                    break;
                }
            }
            if(tag_is_same == 1){
                newId = newId + "," + n_nodes[j].id.toString()
                n_nodes.splice(j,1)
                j--
            }
        }
        var a_node = {"id" : newId , "label": newId}
        graph.addAggregateNode(a_node)
    }
    addAggregateLink(graph)
}

function addAggregateLink(graph){
    //遍历所有新生成的点
    for (let i = 0; i < graph.aggregate_nodes.length; i++){
        //拆分新id 获得对应在原始图中id的集合
        var splitNodes = graph.aggregate_nodes[i].id.split(",")
        for (let j = 0; j < splitNodes.length; j++){
            //扫描新点中的每个点
            for(let k = i + 1; k < graph.aggregate_nodes.length; k++){
                //依次查看这个新点往后的所有点，查看两个新点之间是否有边连接
                var splitNextNodes = graph.aggregate_nodes[k].id.split(",")
                var link = splitNextNodes.find((obj) => {
                    return graph.belongToSameEdge(splitNodes[j], obj)
                })
                if(link != undefined){
                    var aggregate_link = {"source": graph.aggregate_nodes[i].id, "target": graph.aggregate_nodes[k].id}
                    graph.addAggregateLink(aggregate_link)
                }
            }
        }
    }
    //去掉多余的边
    duplicateRemoval(graph.aggregate_links);
}

function Centroid1(graph){
    //添加点
    graph.centroid_nodes = graph.nodes
    for (let i = 0; i < graph.hyperedges.length; i++) {
        //[4,5,6] => '4,5,6',做为id
        var newId = graph.hyperedges[i].toString()
        graph.addCentroidNode({"id":'edge'+i, "label": 'edge'+i, isEdge:true})
        for (let j = 0; j < graph.hyperedges[i].length; j++) {
            var targetNode = graph.selectNodebyId(graph.hyperedges[i][j])
            graph.addCentroidLink({"source": 'edge'+i, "target": targetNode.id})
        }
    }
}

//超边可能会和聚合的点id相同
function Centroid2(graph){
    Aggregate3(graph)
    addCentroidLink(graph)
}

function Centroid3(graph){
    //聚合成的点
    Aggregate2(graph)
    //添加边
    addCentroidLink(graph)
}

function addCentroidLink(graph){
    graph.centroid_links = graph.aggregate_links
    graph.centroid_nodes = graph.aggregate_nodes
    const aggregate_node_size = graph.centroid_nodes.length
    //超边为点
    for (let i = 0; i < graph.hyperedges.length; i++) {
        //[4,5,6] => '4,5,6',做为id
        var newId = graph.hyperedges[i].toString()+","
        graph.addCentroidNode({"id": 'edge'+i, "label": 'edge'+i , isEdge:true})
        //遍历之前的每一个点
        for(let j = 0; j < aggregate_node_size; j++){
            var splitNodes = graph.centroid_nodes[j].id.split(",")
            for(let k = 0; k < splitNodes.length; k++){
                //判断这个点是否属于这个超边
                var link = graph.hyperedges[i].find((obj)=>{
                    return splitNodes[k] == obj
                })
                if(link != undefined){
                    var centroid_link = {"source":'edge'+i, "target": graph.centroid_nodes[j].id , "isEdge": true}
                    graph.addCentroidLink(centroid_link)
                }
            }
        }
    }
    //去掉多余的边
    duplicateRemoval(graph.centroid_links);
}

function Line_expansion1(graph){
    //添加新点
    for(let i = 0; i < graph.hyperedges.length; i++){
        var e_edge = graph.hyperedges[i]
        for(let j = 0; j < e_edge.length; j++){
            var newId = e_edge[j] + "#" + i
            graph.addLineNodes({"id":newId, "edge":i ,"label":newId})
            if (j == (e_edge.length-1)){
                if(j != 1){
                    graph.addLineLinks({"source": newId ,"target": e_edge[0] + "#" + i})
                }
            }else{
                graph.addLineLinks({"source": newId ,"target": e_edge[j+1] + "#" + i})
            }
        }
    }
    //添加边
    for(let i = 0; i < graph.line_expansion_nodes.length; i++){
        var n_id1 = graph.line_expansion_nodes[i].id.split("#")
        for(let j = i+1; j < graph.line_expansion_nodes.length; j++){
            var n_id2 = graph.line_expansion_nodes[j].id.split("#")
            if (n_id1[0] == n_id2[0]){
                graph.addLineLinks({"source":graph.line_expansion_nodes[i].id, "target":graph.line_expansion_nodes[j].id, "tag":1})
            }
        }

    }
}

function Line_expansion2(graph){
    Aggregate2(graph)
    addLine_expansion(graph)
}

function Line_expansion3(graph){
    Aggregate3(graph)
    addLine_expansion(graph)
}

function addLine_expansion(graph){
    //遍历原始超边
    for (let i = 0; i < graph.hyperedges.length; i++){
        //存储当前超边里的节点id
        var temp_edge = []
        //扫描新点中的每个点
        for (let j = 0; j < graph.aggregate_nodes.length; j++){
            //拆分新id 获得对应在原始图中id的集合
            var splitNodes = graph.aggregate_nodes[j].id.split(",")
            //对新点中的每个原始点，判断是否在这条超边中
            for(let k = 0; k < splitNodes.length; k++){
                var link = graph.hyperedges[i].find((obj) => {
                    return obj == splitNodes[k]
                })
                if(link != undefined){
                    temp_edge.push(graph.aggregate_nodes[j].id)
                    break;
                }
            }
        }
        graph.aggregate_hyperedge.push(temp_edge)
    }

    //添加新点
    for(let i = 0; i < graph.aggregate_hyperedge.length; i++){
        var e_edge = graph.aggregate_hyperedge[i]
        for(let j = 0; j < e_edge.length; j++){
            var newId = e_edge[j] + "#" + i
            graph.addLineNodes({"id":newId, "edge":i, "label":newId})
            if (j == (e_edge.length-1)){
                if(j != 1 && j != 0){
                    graph.addLineLinks({"source": newId ,"target": e_edge[0] + "#" + i})
                }
            }else{
                graph.addLineLinks({"source": newId ,"target": e_edge[j+1] + "#" + i})
            }
        }
    }
    //添加边
    for(let i = 0; i < graph.line_expansion_nodes.length; i++){
        var n_id1 = graph.line_expansion_nodes[i].id.split("#")
        for(let j = i+1; j < graph.line_expansion_nodes.length; j++){
            var n_id2 = graph.line_expansion_nodes[j].id.split("#")
            if (n_id1[0] == n_id2[0]){
                graph.addLineLinks({"source":graph.line_expansion_nodes[i].id, "target":graph.line_expansion_nodes[j].id, "tag":1})
            }
        }
    }
    //去掉多余的边
    duplicateRemoval(graph.centroid_links);
}


// 去掉重复的边
function duplicateRemoval(arr) {
    for(let i = 0; i<arr.length;i++) {
        for (let j = i+1; j < arr.length; j++) {
            if (arr[i].source === arr[j].source && arr[i].target===arr[j].target) {
                //删除满足条件的元素
                // console.log("要删除的")
                // console.log(arr[i])
                // console.log(arr[j])
                arr.splice(j,1);
                //因为当前索引值的元素被删除，且后面元素往前移  我们需要将下一次遍历索引从但当前索引开始，即j--
                j--;
            }
        }
    }
}

export{
    split1, split2, split3, 
    Aggregate1, Aggregate2, Aggregate3, 
    Centroid1, Centroid2, Centroid3, 
    Line_expansion1, Line_expansion2, Line_expansion3
}