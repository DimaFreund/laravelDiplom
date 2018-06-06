//create an array with nodes
 var jsonInfo, dataInfo;

jsonInfo = $('#json').val();
dataInfo = $('#data').val()
if(jsonInfo)
 jsonInfo = JSON.parse(jsonInfo);
if(dataInfo)
 dataInfo = JSON.parse(dataInfo);
 console.log(jsonInfo);
 console.log(dataInfo);

 var nodes = new vis.DataSet(jsonInfo);

 // create an array with edges
 var edges = new vis.DataSet(dataInfo);


// create a network
var container = document.getElementById('mynetwork');
var data = {
    nodes: nodes,
    edges: edges
};
var options = {
    "nodes": {
        "borderWidthSelected": 3,
        "color": {
            "highlight": {},
            "hover": {}
        },
        "font": {
            "size": 15,
            "strokeWidth": null
        },
        "scaling": {
            "min": 34,
            "max": null
        },
        "shape": "circle",
        "shapeProperties": {
            "borderRadius": null
        },
        "size": null
    },
    "edges": {
        "arrows": {
            "to": {
                "enabled": true,
                "scaleFactor": 1.85
            }
        },
        "smooth": {
            "forceDirection": "none"
        }
    },
    "manipulation": {
        addNode: function (data, callback) {
            // filling in the popup DOM elements
            document.getElementById('operation').innerHTML = "Add Node";
            document.getElementById('node-id').value = network.body.data.counter
            document.getElementById('node-label').value = network.body.data.counter;
            document.getElementById('saveButton').onclick = saveData.bind(this, data, callback);
            document.getElementById('cancelButton').onclick = clearPopUp.bind();
            document.getElementById('network-popUp').style.display = 'block';
            network.body.data.counter++;
        },
    },
    "physics": {
        "enabled": false,
        "minVelocity": 0.75
    }
};
var network = new vis.Network(container, data, options);
network.body.data.counter = 0;

var matrix = [];

function exportNetwork() {

    var nodes = objectToArray(network.getPositions());

    for (var i = 0; i <= 22; i++) {
        matrix[i] = [];
        for (var y = 1; y <= 22; y++) {
            matrix[i][y] = 0;
        }
    }


    nodes.forEach(addConnections);
    // console.log(nodes);

    var arrayFromTo = network.body.data.edges._data;

    // console.log(arrayFromTo);

    Object.keys(arrayFromTo).forEach(function (item, key, arr) {
        matrix[arrayFromTo[item].from][arrayFromTo[item].to] = 1;
    })
    drawTable(matrix);
    descriptionActor(matrix);
//
//      // pretty print node data
//      var exportValue = JSON.stringify(nodes, undefined, 2);
//
//      exportArea.value = exportValue;
//
//      resizeExportArea();
}

function objectToArray(obj) {
    return Object.keys(obj).map(function (key) {
        obj[key].id = key;
        return obj[key];
    });
}

function addConnections(elem, index) {
    // need to replace this with a tree of the network, then get child direct children of the element
    elem.connections = network.getConnectedNodes(index);
}

function clearPopUp() {
    document.getElementById('saveButton').onclick = null;
    document.getElementById('cancelButton').onclick = null;
    document.getElementById('network-popUp').style.display = 'none';
}

function cancelEdit(callback) {
    clearPopUp();
    callback(null);
}

function saveData(data, callback) {
    data.id = document.getElementById('node-id').value;
    data.label = document.getElementById('node-label').value;
    clearPopUp();
    callback(data);
}

function drawTable(matrix) {
    var table_html = '';
    var thead_html = '<tr><td>-</td>';
    matrix.forEach(function (item, key, array) {
        thead_html += '<td>' + key + '</td>';
        table_html += '<tr><td>' + key + '</td>';
        matrix[key].forEach(function (inner_item, inner_key, inner_array) {
            table_html += '<td>' + inner_item + '</td>';
        })
        table_html += '</tr>';
    })
    thead_html += '</tr>';
    console.log(table_html);
    $('#empty-table').html(table_html);
    $('#empty-thead').html(thead_html);
}

function createNewPotok() {
    var potok = [];
    var flag_end_potok = 0;
    var flag_already_exist = 0;
    for (var row = 1; row < matrix.length; row++) {
        if (matrix[0][row] != 1) {
            flag_already_exist = 1;
        }
        for (var col = 1; col < matrix[row].length; col++) {
            if (matrix[row][col] == 1) {
                if (flag_already_exist) {
                    if (!flag_end_potok) {
                        potok.push(row);
                        matrix[0][row] = 1;
                    }
                    potok.push(col);
                    matrix[0][col] = 1;
                    for (var inner_row = 1; inner_row < matrix.length; inner_row++) {
                        matrix[inner_row][col] = 0;
                        // if(!flag_end_potok) {
                        //     matrix[row][inner_row] = 0;
                        // }
                    }
                    row = col - 1;
                    flag_end_potok = 1;
                    break;
                }
            } else if (col == matrix[row].length - 1 && flag_end_potok) {
                return potok;
            }
        }


    }
    // matrix.forEach(function (parent_item, parent_key, parent_array) {
    //     matrix[parent_key].some(function (item, key, array) {
    //         if (matrix[parent_key][key] == 1) {
    //             potok.push(key);
    //             parent_key = key;
    //             matrix.forEach(function (children_item, children_key, children_array) {
    //                 matrix[children_key][key] = 0;
    //             });
    //             return true;
    //         }
    //     })
    // })
    return potok;
}

function descriptionActor() {
    var potok_arr = [];
    var potok = createNewPotok();
    while (potok.length > 0) {
        potok_arr.push(potok);
        potok = createNewPotok();
    }
    console.log(potok_arr);
    return potok_arr;

}

function objectToArrayWithoutKey(object) {
    var result = [];
    for(var key in object) {
        result.push(object[key]);
    }
    return JSON.stringify(result);
}

function setParamsNodes(nodes) {
    var result = [];

    for( var key in nodes) {
        nodes[key].id = key;
        nodes[key].label = key;
        result.push(nodes[key]);
    }

    console.log('nodes array',result);
    return JSON.stringify(result);
}

$('#saveProjects').submit(function(event) {

    var nodesFinaly = setParamsNodes(network.getPositions());
    var dataFinally = objectToArrayWithoutKey(network.body.data.edges._data);
    var nodes = new vis.DataSet();
    console.log(network);
    console.log(network.getConnectedEdges());
    console.log(network.body.data.edges._data);
    console.log('result');
    console.log(JSON.stringify(nodesFinaly));
    $('#json').val(nodesFinaly);
    $('#data').val(dataFinally);

    return true;
});