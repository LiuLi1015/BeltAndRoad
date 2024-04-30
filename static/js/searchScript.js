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
            displaySearchKnowledgeGraph(data);
        },
        error: function(xhr, status, error) {
            console.error("Error occurred: " + error);
        }
    });
}
document.addEventListener('DOMContentLoaded', function() {
    showKnowledgeGraph('中国');
});
function showKnowledgeGraphByNode() {
    var nodeName = document.getElementById('searchInput').value;
    if (nodeName.trim() !== '') {
        showSearchKnowledgeGraph(nodeName);
    } else {
        console.error("请输入有效的节点名称");
    }
}

function displaySearchKnowledgeGraph(data) {
    var nodes = data.nodes.map(node => ({
        data: {
            id: node.data.id,
            label: node.data.label,
            name: node.data.name ? node.data.name.substring(0, 4) : 'Unknown',
            nameShort: node.data.name ? node.data.name.substring(0, 4) : 'Unknown', // 用于显示节点标签的属性
            full_name: node.data.name // 添加一个新属性来保存完整的节点名称
        }
    }));

    var edges = data.edges.map(edge => ({
        data: {
            id: edge.data.id,
            source: edge.data.source,
            target: edge.data.target,
            label: edge.data.label
        }
    }));

    var elements = nodes.concat(edges);

    var style = [
        { selector: 'node', css: { 'label': 'data(name)', 'text-valign': 'center', 'text-halign': 'center', 'text-wrap': 'wrap', 'height': '80px', 'width': '80px', 'font-size':'22px' } },
        { selector: 'edge', css: { 'label': 'data(label)', 'width': 2, 'curve-style': 'bezier', 'control-point-step-size': 1000, 'line-color': '#ccc', 'font-size':'20px' } },
        // 添加节点悬停时显示完整名称的样式
        { selector: 'node:selected', css: { 'label': 'data(full_name)', 'text-opacity': 1 } },
        // 添加不同类型节点的样式
        { selector: 'node[label = "Project"]', css: { 'background-color': 'rgb(247, 151, 103)' } },
        { selector: 'node[label = "Country"]', css: { 'background-color': 'rgb(218, 113, 148)' } },
        { selector: 'node[label = "Company"]', css: { 'background-color': 'rgb(255, 196, 84)' } },
        { selector: 'node[label = "Name"]', css: { 'background-color': 'rgb(87, 199, 227)' } },
        { selector: 'node[label = "Leixing"]', css: { 'background-color': 'rgb(76, 142, 218)' } },
        { selector: 'node[label = "Time"]', css: { 'background-color': 'rgb(217, 200, 174)' } },
        { selector: 'node[label = "Event"]', css: { 'background-color': 'rgb(201, 144, 192)' } },
        { selector: 'node[label = "Scale1"]', css: { 'background-color': 'rgb(236, 181, 201)' } },
        { selector: 'node[label = "Scale2"]', css: { 'background-color': 'rgb(141, 204, 147)' } },
        { selector: 'node[label = "Location"]', css: { 'background-color': 'rgb(241, 102, 103)' } },
        { selector: 'node[label = "Start"]', css: { 'background-color': 'rgb(86, 148, 128)' } },
        { selector: 'node[label = "End"]', css: { 'background-color': 'rgb(165, 171, 182)' } },
    ];

    var cy = cytoscape({
        container: document.getElementById('graph'),
        elements: elements,
        style: style,
        layout: { name: 'cose', idealEdgeLength:420, nodeOverlap: 120}
    });

    function getNodeCountryPage(nodeId) {
    // 根据节点ID返回对应的国家页面URL
    switch(nodeId) {
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
    cy.on('tap', 'node', function(event) {
            var nodeId = event.target.id(); // 获取点击的节点的ID
            var countryPage = getNodeCountryPage(nodeId); // 根据节点ID获取对应的国家页面URL
            if (countryPage) {
                window.location.href = countryPage; // 跳转到相应的国家页面
            } else {
                console.error('No page found for node ID: ' + nodeId);
            }
        });
}