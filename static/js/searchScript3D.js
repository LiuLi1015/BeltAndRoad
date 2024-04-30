// 异步函数，根据输入节点名称获取相关的知识图谱数据
function showSearchKnowledgeGraph(param) {
    var dataToSend = {};
    if (typeof param === 'string') {
        if (param.toLowerCase() === '国家' || param.toLowerCase() === '承建公司' || param.toLowerCase() === '类型' || param.toLowerCase() === '规模' || param.toLowerCase() === '投资额' || param.toLowerCase() === '时间' || param.toLowerCase() === '事件' || param.toLowerCase() === '地理位置' || param.toLowerCase() === '起点' || param.toLowerCase() === '终点' || param.toLowerCase() === '名称') {
            dataToSend = { relation_type: param };
        } else {
            dataToSend = { node_name: param };
        }
    }
    $.ajax({
        type: 'POST',
        url: '/get_knowledge_graph',
        contentType: 'application/json',
        data: JSON.stringify(dataToSend),
        success: function(data) {
            console.log(data);
            // 清空之前的知识图谱
            clearKnowledgeGraph();
            // 显示搜索到的知识图谱
            displayKnowledgeGraph3(data);
        },
        error: function(xhr, status, error) {
            console.error("Error occurred: " + error);
        }
    });
}
// 根据节点名称显示相关的知识图谱
function showKnowledgeGraphByNode1() {
    var nodeName = document.getElementById('searchInput').value;
    if (nodeName.trim() !== '') {
        showSearchKnowledgeGraph(nodeName);
    } else {
        console.error("请输入有效的节点名称");
    }
}
document.addEventListener('DOMContentLoaded', function() {
    showSearchKnowledgeGraph('大摩拉岛大桥');
});
// 清空知识图谱
function clearKnowledgeGraph() {
    // 清空场景中的节点和边数据
      nodes3D = [];
      edges3D = [];
}
function displayKnowledgeGraph3(data) {
    // 清空原有的节点和边数据
    clearKnowledgeGraph();
    // 处理新的节点和边数据
    var newNodes = data.nodes;
    var newEdges = data.edges;
    // 创建新的节点和边数据数组
     var nodes3D = [];
     var edges3D = [];
    var nodesDrawn = []; // 定义一个空数组来存储已绘制的节点

    // 处理新的节点数据
    newNodes.forEach(node => {
        if (!nodesDrawn.includes(node.data.id)) {
            var label = createNodeLabel(node.data.name);
            // 将标签的位置设置为节点的位置
            label.position.set(0, 0, 0);
            // 将标签的位置设置为节点的原点（内部）
            node.position = new THREE.Vector3(Math.random() * 200 - 200, Math.random() * 200 - 100, Math.random() * 200 - 100);
            // 根据节点类型设置不同的球体几何体大小
            var nodeSize;
            switch (node.data.label.toLowerCase()) {
                case 'project':
                    nodeSize = 6; // 设置项目类型节点的大小
                    break;
                case 'country':
                    nodeSize = 8; // 设置国家类型节点的大小
                    break;
                case 'company':
                    nodeSize = 10; // 设置公司类型节点的大小
                    break;
                default:
                    nodeSize = 6; // 默认大小
                    break;
            }
            var sphereGeometry = new THREE.SphereGeometry(nodeSize, 64, 64); // 创建球体几何体
            var sphereMaterial = new THREE.MeshBasicMaterial({ color: getNodeColor(node.data.label), transparent: true, opacity: 0.7 }); // 根据节点类型设置颜色
            var node3D = new THREE.Mesh(sphereGeometry, sphereMaterial); // 创建球体对象

            node3D.position.copy(node.position);
            // 设置比例
            node3D.scale.set(1, 1, 1); // 将 x、y、z 三个轴向的比例设置为相同的
            // 将标签添加到节点的内部
            node3D.add(label);
            // 将节点添加到场景中
            nodes3D.push(node3D);
            // 将节点的id添加到已绘制节点的列表中
            nodesDrawn.push(node.data.id);
        }
    });

    // 处理新的边数据
    newEdges.forEach(edge => {
        var startNode = newNodes.find(node => node.data.id === edge.data.source);
        var endNode = newNodes.find(node => node.data.id === edge.data.target);
        if (startNode && endNode) {
            var geometry = new THREE.BufferGeometry();
            geometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array([
                startNode.position.x, startNode.position.y, startNode.position.z,
                endNode.position.x, endNode.position.y, endNode.position.z
            ]), 3));
            var edge3D = new THREE.Line(
                geometry,
                new THREE.LineBasicMaterial({ color: 0x878584, transparent: true, opacity: 0.5 }) // 启用 transparent 属性
            );
            edges3D.push(edge3D);
            // 计算边的中点位置
            var labelPos = new THREE.Vector3().copy(startNode.position).lerp(endNode.position, 0.7);
            // 添加边上的标签，将标签位置稍微偏移以避免显示在边的中间
            var label = createEdgeLabel(edge.data.label);
            label.position.copy(labelPos).add(new THREE.Vector3(0, 5, 0));
            nodes3D.push(label);
        }
    });

    // 清空原有的节点和边数据
    clearKnowledgeGraph();

    // 渲染节点和边数据
    scene = new THREE.Scene();
    nodes3D.forEach(node => scene.add(node));
    edges3D.forEach(edge => scene.add(edge));
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 100;
    renderer = new THREE.WebGLRenderer();
    var backgroundWidth = 1550; // 设置背景宽度
    var backgroundHeight = 950; // 设置背景高度
    // 更新渲染器的大小和背景颜色
    renderer.setSize(backgroundWidth, backgroundHeight);
    renderer.setClearColor(0xfacfa9); // 设置背景颜色
    var graphContainer = document.getElementById('graph');
    graphContainer.appendChild(renderer.domElement);
    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.update();
}

// 根据节点类型获取颜色
function getNodeColor(label) {
    // 根据节点类型返回颜色
    switch (label.toLowerCase()) {
        case 'project':
            return 0xF154A5;  //粉色
        case 'country':
            return 0x007BFF; //蓝色
        case 'company':
            return 0xDAA520;
        default:
            return 0xFFA500; //橙色
    }
}
    function animate() {
        requestAnimationFrame(animate);
        nodes3D.forEach(node => {
            if (node instanceof THREE.Mesh) {
                node.rotation.x += 0.01;
                node.rotation.y += 0.01;
            }
        });
        controls.update(); // 更新控制器状态
        renderer.render(scene, camera);
    }
    animate();


// 根据节点ID返回对应的国家页面URL
function getNodeCountryPage(nodeId) {
    switch (nodeId) {
        case 101:
            return 'Arab_Emirate.html';
        case 127:
            return 'Pakistan.html';
        case 137:
            return 'Kazakhstan.html';
        default:
            return null; // 没有匹配的页面，返回null
    }
}

function createNodeLabel(text) {
    var canvas = document.createElement('canvas');
    var context = canvas.getContext('2d');
    // 设置 canvas 大小
    canvas.width = 100;
    canvas.height = 50;
    // 设置文本样式
    var fontSize = 23; // 设置节点标签的字体大小
    var fontFamily = 'Arial';
    context.font = 'Bold ' + fontSize + 'px ' + fontFamily;
    // 计算文字宽度
    var textWidth = context.measureText(text).width;
    // 绘制文本
    context.fillStyle = 'black';
    var x = (canvas.width - textWidth) / 2; // 计算文字绘制位置使其居中
    var y = fontSize; // 文字绘制的垂直位置
    context.fillText(text, x, y);
    // 创建纹理并应用到 sprite 材质
    var texture = new THREE.CanvasTexture(canvas);
    var material = new THREE.SpriteMaterial({ map: texture });
    // 创建 sprite
    var sprite = new THREE.Sprite(material);
    // 统一设置标签的大小
    var scale = 0.1; // 根据需要调整标签的缩放比例
    sprite.scale.set(canvas.width * scale, canvas.height * scale, 1);
    return sprite;
}
function createEdgeLabel(text) {
    var canvas = document.createElement('canvas');
    var context = canvas.getContext('2d');
    // 设置 canvas 大小
    canvas.width = 100;
    canvas.height = 50;
    // 设置文本样式
    var fontSize = 12; // 设置边上标签的字体大小
    var fontFamily = 'Helvetica';
    context.font = 'Bold ' + fontSize + 'px ' + fontFamily;
    var textWidth = context.measureText(text).width;
    context.fillStyle = 'gray'; // 将文本颜色设置为灰色
    var x = (canvas.width - textWidth) / 2; // 计算文字绘制位置使其居中
    var y = fontSize; // 文字绘制的垂直位置
    context.fillText(text, x, y);

    var texture = new THREE.CanvasTexture(canvas);
    var material = new THREE.SpriteMaterial({ map: texture });

    var sprite = new THREE.Sprite(material);

    var scale = 0.1; // 根据需要调整标签的缩放比例
    sprite.scale.set(canvas.width * scale, canvas.height * scale, 1);
    return sprite;
}