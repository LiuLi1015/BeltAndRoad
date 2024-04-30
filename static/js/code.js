var cy

$(function(){
  $.get('/graph', function(result) {
    var style = [
      { selector: 'node[label = "Project"]', css: {'background-color': '#6FB1FC' , 'label':'data(name)', 'text-valign' :'center', 'text-halign':'center', 'text-wrap':'wrap' , 'height': '80px', 'width':'80px'}},
      { selector: 'node[label = "Country"]', css: {'background-color': '#F5A45D' , 'label':'data(name)', 'text-valign' :'center', 'text-halign':'center', 'text-wrap':'wrap' , 'height': '80px', 'width':'80px'}},
      { selector: 'node[label = "Leixing"]', css: {'background-color': '#00FFFF' , 'label':'data(name)', 'text-valign' :'center', 'text-halign':'center', 'text-wrap':'wrap' , 'height': '80px', 'width':'80px'}},
      { selector: 'node[label = "Company"]', css: {'background-color': '#FF00FF' , 'label':'data(name)', 'text-valign' :'center', 'text-halign':'center', 'text-wrap':'wrap' , 'height': '80px', 'width':'80px'}},
      { selector: 'node[label = "Location"]', css: {'background-color': '#DC143C' , 'label':'data(name)', 'text-valign' :'center', 'text-halign':'center', 'text-wrap':'wrap' , 'height': '80px', 'width':'80px'}},
      { selector: 'node[label = "Name"]', css: {'background-color': '#800000' , 'label':'data(name)', 'text-valign' :'center', 'text-halign':'center', 'text-wrap':'wrap' , 'height': '80px', 'width':'80px'}},
      { selector: 'edge',css: {'label': 'data(label)','width': 2, 'curve-style': 'bezier','control-point-step-size': 200,'line-color': '#ccc'}}
    ];

    cy = cytoscape({
      container: document.getElementById('cy'),
      style: style,
      layout: { name: 'cose', fit: false },
      elements: {
        nodes: result.nodes,
        edges: result.edges
      }
    });
  // Update the graph display after getting the data
    cy.json({ elements: { nodes: result.nodes, edges: result.edges } });
  }, 'json');
});