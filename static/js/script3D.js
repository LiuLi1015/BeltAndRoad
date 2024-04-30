// 添加一个全局变量来跟踪当前选择的关系类型
var selectedRelation = null;
// 添加一个全局变量来存储所有节点和边的数据
var allNodes = [];
var allEdges = [];
var scene, camera, renderer, controls;
// 点击标签时触发的事件处理程序
function toggleRelation(relation) {
    if (selectedRelation === relation) {
        selectedRelation = null;
        allNodes = allNodes.filter(node => node.data.label !== relation);
        allEdges = allEdges.filter(edge => edge.data.label !== relation);
        // 重新显示知识图谱
        displayKnowledgeGraph({ nodes: allNodes, edges: allEdges });
    } else {
        selectedRelation = relation;
        showKnowledgeGraph(selectedRelation);
    }
}
function showKnowledgeGraph(param) {
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
            displayKnowledgeGraph(data);
        },
        error: function(xhr, status, error) {
            console.error("Error occurred: " + error);
        }
    });
}
document.addEventListener('DOMContentLoaded', function() {
    showKnowledgeGraph('中国');
});
function displayKnowledgeGraph(data) {
    // 清空之前的节点和边数据
    clearKnowledgeGraph();
    // 处理新的节点和边数据
    var newNodes = data.nodes;
    var newEdges = data.edges;
    // 将新的节点和边数据添加到已有数据中
    allNodes = allNodes.concat(newNodes);
    allEdges = allEdges.concat(newEdges);

    // 渲染节点和边数据
    scene = new THREE.Scene();
    var nodesDrawn = []; // 定义一个空数组来存储已绘制的节点
    allNodes.forEach(node => {
        if (!nodesDrawn.includes(node.data.id)) {
            var label = createNodeLabel(node.data.name);
            // 将标签的位置设置为节点的位置
            label.position.set(0, 0, 0);
            // 将标签的位置设置为节点的原点（内部）
            node.position = new THREE.Vector3(Math.random() * 150 - 100, Math.random() * 150 - 100, Math.random() * 150 - 100); // 根据节点类型设置不同的球体几何体大小
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
            scene.add(node3D);
            // 将节点的id添加到已绘制节点的列表中
            nodesDrawn.push(node.data.id);
         }
    });

    allEdges.forEach(edge => {
        var startNode = allNodes.find(node => node.data.id === edge.data.source);
        var endNode = allNodes.find(node => node.data.id === edge.data.target);
        if (startNode && endNode) {
            var geometry = new THREE.BufferGeometry();
            geometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array([
                startNode.position.x, startNode.position.y, startNode.position.z,
                endNode.position.x, endNode.position.y, endNode.position.z
            ]), 3));
            var edge3D = new THREE.Line(
                geometry,
                new THREE.LineBasicMaterial({ color: 0x000000, transparent: true, opacity: 0.1 }) // 启用 transparent 属性
            );
            scene.add(edge3D);
            // 计算边的中点位置
            var labelPos = new THREE.Vector3().copy(startNode.position).lerp(endNode.position, 0.7);
            // 添加边上的标签，将标签位置稍微偏移以避免显示在边的中间
           var label = createEdgeLabel(edge.data.label);
           label.position.copy(labelPos).add(new THREE.Vector3(0, 5, 0));
           // scene.add(label);
        }
    });
    initRenderer();
    initCamera();
    initControls();
    animate();
}

function initRenderer() {
    renderer = new THREE.WebGLRenderer();
    var backgroundWidth = 1550; // 设置背景宽度
    var backgroundHeight = 950; // 设置背景高度
    renderer.setSize(backgroundWidth, backgroundHeight);
    renderer.setClearColor(0xfacfa9); // 设置背景颜色
    var graphContainer = document.getElementById('graph');
    graphContainer.appendChild(renderer.domElement);
}

function initCamera() {
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 100;
}

function initControls() {
    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.update();
}

function animate() {
    requestAnimationFrame(animate);
    controls.update(); // 更新控制器状态
    renderer.render(scene, camera);
}

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
function clearKnowledgeGraph() {
    if (scene) {
        while (scene.children.length > 0) {
            scene.remove(scene.children[0]);
        }
    }
    if (camera) {
        camera.position.set(0, 0, 0);
        camera.lookAt(0, 0, 0);
    }
    if (renderer) {
        renderer.domElement.remove();
        renderer.forceContextLoss();
        renderer.dispose();
        renderer = null;
    }
    var graphContainer = document.getElementById('graph');
    while (graphContainer.firstChild) {
        graphContainer.removeChild(graphContainer.firstChild);
    }
}

// 添加点击事件监听器
window.addEventListener('click', onDocumentClick, false);
function onDocumentClick(event) {
    console.log("Clicked!"); // 添加日志输出
    // 获取鼠标点击的位置
    var mouse = new THREE.Vector2();
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    // 通过摄像机和鼠标位置来更新射线
    var raycaster = new THREE.Raycaster();
    raycaster.setFromCamera(mouse, camera);

    // 计算射线与节点的交点
    var intersects = raycaster.intersectObjects(scene.children, true); // 检测整个场景中的所有对象

    if (intersects.length > 0) {
        // 如果有交点，则执行相应的操作
        var clickedNode = intersects[0].object;
        console.log("Node ID:", clickedNode.userData.id); // 输出节点 ID
        // window.location.href = '/node-details?nodeName=' + clickedNode.userData.name; // 执行跳转操作
        switch(id) {
        case '101':
            return 'Arab_Emirate';
        case '127':
            return 'Pakistan';
        case '137':
            return 'Kazakhstan';
        case '138':
            return '/Laos';
        case '111':
            return '/Russia';
        case '117':
            return '/Vietnam';
        case '131':
            return '/Egypt';
        case '116':
            return '/Thailand';
        case '147':
            return '/The_Democratic_Socialist_Republic_of_Sri_Lanka';
        case '115':
            return '/Brunei';
        case '145':
            return '/Turkey';
        case '118':
            return '/Turkmenistan';
        case '146':
            return '/the_Republic_of_the_Union_of_Myanmar';
        case '125':
            return '/The_People_Republic_of_Bangladesh';
        case '132':
            return '/Croatia';
        case '113':
            return '/Hungary';
        case '123':
            return '/Indonesia';
        case '122':
            return '/Kingdom_of_Saudi_Arabia';
        case '121':
            return '/Mongolia';
        case '105':
            return '/Oman';
        case '126':
            return '/Oman';
        case '153':
            return '/Poland';
        case '157':
            return '/Malaysia';
        case '3':
            return '/banamayunhesanqiao';
        case '17':
            return '/aieraisipinuo';
        case '21':
            return '/bolaiguojijichang';
        case '5':
            return '/damoladaodaqiao';
        case '92':
            return '/haxinukegangjingjitequ';
        case '77':
            return '/kaluote';
        case '11':
            return '/kanapulihaidisuidao';
        case '42':
            return '/lvyoulianmeng';
        case '91':
            return '/mazhongguandanchanyeyuan';
        case '1':
            return '/meiguoxinhaiwandaqiao';
        case '9':
            return '/muhanmodeliushidaqiao';
        case '15':
            return '/neiluobikuaisulu';
        case '39':
            return '/shengtaiwenhua';
        case '41':
            return '/wenhuazhiye';
        case '97':
            return '/zhongechannenghezuoshifanyuan';
        case '34':
            return '/zhongeshuyou';
        default:
            return null; // 没有匹配的页面，返回null
    }
    }
}

function findClickedNode(intersects) {
    // 从交点对象中找到点击的节点
    for (var i = 0; i < intersects.length; i++) {
        var object = intersects[i].object;
        if (object.userData && object.userData.id !== undefined) { // 确保节点对象有userData属性，并且userData中包含ID信息
            return object;
        }
    }
    return null;
}


function findClickedNode(intersects) {
    // 从交点对象中找到点击的节点
    for (var i = 0; i < intersects.length; i++) {
        var object = intersects[i].object;
        if (object.userData && object.userData.id !== undefined) { // 确保节点对象有userData属性，并且userData中包含ID信息
            return object;
        }
    }
    return null;
}

function createNodeLabel(text) {
    var canvas = document.createElement('canvas');
    var context = canvas.getContext('2d');
    canvas.width = 100;
    canvas.height = 50;
    var fontSize = 28;
    var fontFamily = 'Arial';
    context.font = 'Bold ' + fontSize + 'px ' + fontFamily;
    var textWidth = context.measureText(text).width;
    context.fillStyle = 'black';
    var x = (canvas.width - textWidth) / 2;
    var y = fontSize;
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
    var fontSize = 20; // 设置边上标签的字体大小
    var fontFamily = 'Helvetica';
    context.font = 'Bold ' + fontSize + 'px ' + fontFamily;
    var textWidth = context.measureText(text).width;
    context.fillStyle = 'grey'; // 将文本颜色设置为灰色
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
