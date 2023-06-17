function desplit(graph, G6_graph){
    for(var i = 0; i < G6_graph.length; i++){
        graph.postedges.push(G6_graph[i].position)
    }
}

function disAggregate1(nodes, edges, g){
    //原来点的id和删掉多余点后的id
    var nodeIDmatch = []
    //排序后的超边,序号信息
    var sortHyperedgesIndex = g.getIndex()
    var allNodeModels = []
    var allEdgeModels = []

    //分列出所有的点
    sortHyperedgesIndex.forEach(function(n,i){
        var model = nodes[n.index].getModel()
        var old_pointId = model.id
        var new_pointId = ''
        var pointId = old_pointId.split(',')
        for(var j = 0; j < pointId.length; j++){
            var point_name = pointId[j]
            //如果在后面边中存在，就忽略它
            if(g.stillexsit(point_name, i, sortHyperedgesIndex)){
                continue;
            }else{
                //后面边中不存在了，作为新点加入图中
                new_pointId = new_pointId + ',' + point_name
                var nodeModel = []
                nodeModel.id = point_name
                // nodeModel.label = point_name.slice(0,2).toUpperCase();
                nodeModel.label = findLabel(point_name, g)
                nodeModel.x = model.x
                nodeModel.y = model.y
                allNodeModels.push(nodeModel);
            }
        }
        nodeIDmatch.push({"old_pointId":old_pointId, "new_pointId":new_pointId})
    })
    // console.log("nodeIDmatch")
    // console.log(nodeIDmatch)
    //分裂出所有的边
    edges.forEach(function(e, i){
        var temp_edge = e.getModel()
        var source = temp_edge.source
        var target = temp_edge.target
        var new_source = findNewEdges(source, nodeIDmatch)
        var new_target = findNewEdges(target, nodeIDmatch)

        if(new_source != '' && new_target != ''){
            new_source = new_source.split(',')
            new_target = new_target.split(',')
            for(var i = 1; i < new_source.length; i++){
                for(var j = 1; j < new_target.length; j++){
                    allEdgeModels.push({source:new_source[i], target:new_target[j]})
                }
            }
        }
    })
    return [allEdgeModels, allNodeModels]

}

function disAggregate2(nodes, edges, g){
    
    var allNodeModels = []
    var allEdgeModels = []

    //分列出所有的点
    nodes.forEach(function(n, i){
        var model = n.getModel()
        var old_pointId = model.id
        var pointId = old_pointId.split(',')
        for(var j = 0; j < pointId.length; j++){
            var point_name = pointId[j]
            var nodeModel = []
            nodeModel.id = point_name
            nodeModel.label = findLabel(point_name,g)
            // nodeModel.label = point_name.slice(0,2).toUpperCase();
            nodeModel.x = model.x
            nodeModel.y = model.y
            allNodeModels.push(nodeModel);
        }
    })

    //分裂出所有的边
    edges.forEach(function(e, i){
        var temp_edge = e.getModel()
        var source = temp_edge.source.split(',')
        var target = temp_edge.target.split(',')
        for(var i = 0; i < source.length; i++){
            for(var j = 0; j < target.length; j++){
                allEdgeModels.push({source:source[i], target:target[j]})
            }
        }
    })
    return [allEdgeModels, allNodeModels]

}

function disCentroid1(nodes, edges, g){
    
    var allNodeModels = []
    var allEdgeModels = []

    //将边化成的点删掉即可
    nodes.forEach(function(n,i){
        var model = n.getModel()
        if(model.isEdge != true){
            var point_name = model.id
            var nodeModel = []
            nodeModel.id = point_name
            // nodeModel.label = point_name.slice(0,2).toUpperCase();
            nodeModel.label = findLabel(point_name,g) 
            nodeModel.fy = model.y
            allNodeModels.push(nodeModel);
        }
    })
    for (let i = 0; i < g.hyperedges.length; i++){
        for (let j = 0; j < g.hyperedges[i].length; j++){
            if(j != g.hyperedges[i].length - 1){
                allEdgeModels.push({"source": g.hyperedges[i][j].toString(), "target": g.hyperedges[i][j+1].toString()})
            }else{
                allEdgeModels.push({"source": g.hyperedges[i][j].toString(), "target": g.hyperedges[i][0].toString()})
            }
        }
    }
    return [allEdgeModels, allNodeModels]
}

function disCentroid2(nodes, edges, g){
    
    var allNodeModels = []
    var allEdgeModels = []

    //将边化成的点删掉即可
    nodes.forEach(function(n,i){
        var model = n.getModel()
        if(model.isEdge != true){
            var old_pointId = model.id
            var pointId = old_pointId.split(',')
            for(var j = 0; j < pointId.length; j++){
                var point_name = pointId[j]
                var nodeModel = []
                nodeModel.id = point_name
                // nodeModel.label = point_name.slice(0,2).toUpperCase();
                nodeModel.label = findLabel(point_name, g)
                nodeModel.x = model.x
                nodeModel.y = model.y
                allNodeModels.push(nodeModel);
            }
        }
    })

    //分裂出所有的边
    edges.forEach(function(e, i){
        var temp_edge = e.getModel()
        if(temp_edge.isEdge != true){
            var source = temp_edge.source.split(',')
            var target = temp_edge.target.split(',')
            for(var i = 0; i < source.length; i++){
                for(var j = 0; j < target.length; j++){
                    allEdgeModels.push({source:source[i], target:target[j]})
                }
            }
        }
    })

    return [allEdgeModels, allNodeModels]
}

function disExpansion1(nodes, edges, g){
    
    var allNodeModels = []
    var allEdgeModels = []

    var tempnodes = g.nodes
    for(var i = 0; i < tempnodes.length; i++){
        tempnodes[i].x = 0
        tempnodes[i].y = 0
    }

    //对相同的点坐标取平均值
    nodes.forEach(function(n,i){
        var model = n.getModel()
        var old_pointId = model.id
        var pointId = old_pointId.split('#')
        
        tempnodes.forEach(function(node_name, i){
            if(node_name.id == pointId[0]){
                node_name.x = (node_name.x + model.x)/2
                node_name.y = (node_name.y + model.y)/2
                return
            }
        })
    })
    tempnodes.forEach(function(n,i){
        var nodeModel = []
        nodeModel.id = n.id
        // nodeModel.label = n.id.slice(0,2).toUpperCase();
        nodeModel.label = findLabel(n.id, g)
        nodeModel.x = n.x
        nodeModel.y = n.y
        allNodeModels.push(nodeModel)
    })

    //边按照团展开
    for (let i = 0; i < g.hyperedges.length; i++){
        for (let j = 0; j < g.hyperedges[i].length; j++){
            if(j != g.hyperedges[i].length - 1){
                allEdgeModels.push({"source": g.hyperedges[i][j].toString(), "target": g.hyperedges[i][j+1].toString()})
            }else{
                allEdgeModels.push({"source": g.hyperedges[i][j].toString(), "target": g.hyperedges[i][0].toString()})
            }
        }
    }
    return [allEdgeModels, allNodeModels]
}

function disExpansion2(nodes, edges, g){
    
    var allNodeModels = []
    var allEdgeModels = []

    var tempnodes = g.aggregate_nodes
    for(var i = 0; i < tempnodes.length; i++){
        tempnodes[i].x = 0
        tempnodes[i].y = 0
    }

    //对相同的点坐标取平均值
    nodes.forEach(function(n,i){
        var model = n.getModel()
        var old_pointId = model.id
        var pointId = old_pointId.split('#')
        // console.log(pointId)
        tempnodes.forEach(function(node_name, i){
            if(node_name.id == pointId[0]){
                node_name.x = (node_name.x + model.x)/2
                node_name.y = (node_name.y + model.y)/2
                return
            }
        })
    })

    //将聚合的点展开
    tempnodes.forEach(function(n,i){
        var old_pointId = n.id
        var pointId = old_pointId.split(',')
        for(var j = 0; j < pointId.length; j++){
            var point_name = pointId[j]
            var nodeModel = []
            nodeModel.id = point_name
            // nodeModel.label = point_name.slice(0,2).toUpperCase();
            nodeModel.label = findLabel(point_name , g) 
            nodeModel.x = n.x
            nodeModel.y = n.y
            allNodeModels.push(nodeModel);
        }
    })

    //边按照团展开
    var oldedges = g.aggregate_links
    
    oldedges.forEach(function(e, i){
        var source = e.source.split(',')
        var target = e.target.split(',')
        for(var i = 0; i < source.length; i++){
            for(var j = 0; j < target.length; j++){
                allEdgeModels.push({source:source[i], target:target[j]})
            }
        }
    })

    return [allEdgeModels, allNodeModels]
}



function findNewEdges(node, nodeIDmatch){
    for(var i = 0; i < nodeIDmatch.length; i++){
        if(nodeIDmatch[i].old_pointId == node){
            return nodeIDmatch[i].new_pointId
        }
    }
}
function findLabel(id, g){
    var node = g.nodes
    var n = node.find((obj) => {
        return obj.id == id
    })
    return n.label
}
export{desplit, disAggregate1,disAggregate2,disCentroid1,disCentroid2,disExpansion1,disExpansion2}