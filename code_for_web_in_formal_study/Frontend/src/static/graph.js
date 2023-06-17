class mygraph{
    constructor(nodes,links,hyperedges){
        this.nodes = nodes
        this.links = links
        this.hyperedges = hyperedges
        this.aggregate_nodes = []
        this.aggregate_links = []
        this.centroid_nodes = []
        this.centroid_links = []
        this.line_expansion_nodes = []
        this.line_expansion_links = []
        this.aggregate_hyperedge = []
        this.calDegree(this.nodes, this.hyperedges)
        this.resortEdges(this.nodes, this.hyperedges)

        this.postedges = []
        this.nodeposition = []
    }
    //link的格式：{source: , target: }
    addLinks(link){
        this.links.push(link);
    }
    //node: {id:,degree:}
    addNodes(node){
        this.links.push(node);
    }
    //hyperedge:[1,2,3]
    addHyperedges(hyperedge){
        this.links.push(hyperedge);
    }
    //aggregate 聚合方法中，添加聚合后的点
    addAggregateNode(node){
        this.aggregate_nodes.push(node);
    }
    //aggregate 聚合方法中，添加聚合后的边
    addAggregateLink(link){
        this.aggregate_links.push(link);
    }
    //centroid 聚合方法中，添加聚合后的点
    addCentroidNode(node){
        this.centroid_nodes.push(node);
    }
    //centroid 聚合方法中，添加聚合后的边
    addCentroidLink(link){
        this.centroid_links.push(link);
    }
    //line_expansion 聚合方法中，添加聚合后的点
    addLineNodes(node){
        this.line_expansion_nodes.push(node);
    }
    //line_expansion 聚合方法中，添加聚合后的边
    addLineLinks(link){
        this.line_expansion_links.push(link);
    }
    //根据id查找点
    selectNodebyId(id){
        return this.centroid_nodes.find((obj) => {
            return obj.id == id
        })
    }

    //计算各个顶点的度
    calDegree(nodes,hyperedges){
        for(var i = 0; i < nodes.length; i++){
            var n_degree = 0;
            for (var j = 0; j < hyperedges.length; j++){
                
                var existInEdge = hyperedges[j].find((obj) => {
                    return obj == nodes[i].id
                })
                if (existInEdge != undefined){
                    n_degree ++;
                }
            }
            nodes[i].degree = n_degree; 
        }
    }

    //按照度的多少对点排序
    resortEdges(nodes, hyperedges){
        console.log("nodes")
        console.log(nodes)
        for(var i = 0; i < hyperedges.length; i++){
            var h_edge = hyperedges[i];
            h_edge.sort((a,b) => {
                const a_degree = nodes.find((obj) => {
                    return obj.id == a;
                })
                const b_degree = nodes.find((obj) => {
                    return obj.id == b;
                })
                return a_degree.degree - b_degree.degree
            })
        }
    }

    //判断两个点是否属于同一个超边,输入的是两个点的id
    belongToSameEdge(id1, id2){
        for (var i = 0; i < this.hyperedges.length; i++) {
            var e_hyperedges = this.hyperedges[i]
            var find_node1 = e_hyperedges.find((obj) => {
                return id1 == obj
            })
            var find_node2 = e_hyperedges.find((obj) => {
                return id2 == obj
            })
            if(find_node1 != undefined && find_node2 != undefined){
                return true
            }
        }
        return false
    }
    stillexsit(id, index, sortHyperedgesIndex){
        var my_edges = []
        for (var i = 0; i < sortHyperedgesIndex.length; i++){
            my_edges.push(sortHyperedgesIndex[i].hyperEdge)
        }

        for (var i = index + 1; i < my_edges.length; i++){
            var e_hyperedges = my_edges[i]
            var find = e_hyperedges.find((obj) => {
                return id == obj
            })
            if(find != undefined ){
                return true
            }
        }
        return false
    }

    //按照超边度数进行排序
    getIndex(){
        var temp = []
        for (var i = 0; i < this.hyperedges.length; i++){
            temp.push({index:i, length:this.hyperedges[i].length, hyperEdge:this.hyperedges[i]} )
        }
        temp.sort((a,b)=>(b.length - a.length))
        return temp
    }

    //获取超边对应顶点序号的集合
    getHyperedgesIndex(){
        var edgeofNodesIndex = []
        for (var i = 0; i < this.hyperedges.length; i++){
            var edge = []
            for (var j = 0; j < this.hyperedges[i].length; j++){
                var hedges = this.hyperedges[i]
                this.nodes.forEach(function(n,m){
                    if (hedges[j] == n.id){
                        edge.push(m)
                    }
                })
            }
            edgeofNodesIndex.push(edge)
        }
        return edgeofNodesIndex
    }

}

export{
    mygraph
}