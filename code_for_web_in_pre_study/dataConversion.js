const fs = require('fs');

// 读取本地文件内容
var filePath = 'C:/Users/29354/Desktop/Hypergraph/数据集/co-author.cyjs';
const fileData = fs.readFileSync(filePath, 'utf-8');

// 解析文件内容为 JavaScript 对象
const data = JSON.parse(fileData);

// console.log(data.elements.nodes);

const g6Data = {
    nodes: [],
    edges: []
};

// 处理节点数据
data.elements.nodes.forEach(node => {
    const g6Node = {
        id: node.data.id,
        label: node.data.name,
        x: node.position.x,
        y: node.position.y
        // 其他你可能需要的节点属性
    };
    g6Data.nodes.push(g6Node);
});

data.elements.edges.forEach(edge => {
    // console.log(edge.data);
    const g6Edge = {
        // id: edge.data.id,
        source: edge.data.source,
        target: edge.data.target
        // 其他你可能需要的边属性
    };
    g6Data.edges.push(g6Edge);
});

// console.log(g6Data);

// 将数据转换为 JSON 字符串
const jsonData = JSON.stringify(g6Data, null, 2);

// 写入文件
filePath = 'C:/Users/29354/Desktop/Hypergraph/数据集/co-author.json';
fs.writeFileSync(filePath, jsonData, 'utf-8');