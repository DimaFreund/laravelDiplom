//create an array with nodes
 var jsonInfo, dataInfo;
var nodes = [];

jsonInfo = $('#json').val();
dataInfo = $('#data').val();
if(jsonInfo) {
    var jsonInfoObject = JSON.parse(jsonInfo);
    jsonInfo = jsonInfoObject.info;
    var jsonCount = jsonInfoObject.count;
}
if(dataInfo) {
    var dataInfoObject = JSON.parse(dataInfo);
    dataInfo = dataInfoObject.info;
    var dataCount = dataInfoObject.count;
}



//jsonInfo = [    {id: 1, label: '1', x: -350, y: -540, shape:'database'},    {id: 2, label: '2', x: -250, y: -540, shape:'database'},    {id: 3, label: '3', x: -150, y: -540, shape:'database'},    {id: 4, label: '4', x: 0, y: -540, shape:'database'},    {id: 5, label: '5', x: 100, y: -540, shape:'database'},    {id: 6, label: '6', x: 200, y: -540, shape:'database'},    {id: 1001, label: '1', x: -300, y: -450},    {id: 1002, label: '2', x: -150, y: -450},    {id: 1003, label: '3', x: 0, y: -450},    {id: 1004, label: '4', x: 150, y: -450},    {id: 1005, label: '5', x: -375, y: -300},    {id: 1006, label: '6', x: -225, y: -300},    {id: 1007, label: '7', x: -75, y: -300},    {id: 1008, label: '8', x: 75, y: -300},    {id: 1009, label: '9', x: 225, y: -300},    {id: 1010, label: '10', x: -300, y: -150},    {id: 1011, label: '11', x: -150, y: -150},    {id: 1012, label: '12', x: -0, y: -150},    {id: 1013, label: '13', x: 150, y: -150},    {id: 1014, label: '14', x: -150, y: 0},    {id: 1015, label: '15', x: 0, y: 0},    {id: 1016, label: '16', x: -225, y: 150},    {id: 1017, label: '17', x: -75, y: 150},    {id: 1018, label: '18', x: 75, y: 150},    {id: 1019, label: '19', x: -150, y: 300},    {id: 1020, label: '20', x: 0, y: 300},    {id: 1021, label: '21', x: -75, y: 450},    {id: 1022, label: '22', x: -75, y: 600},];
// dataInfo = [    {from: 1001, to: 1005},    {from: 1001, to: 1006},    {from: 1002, to: 1006},    {from: 1003, to: 1006},    {from: 1003, to: 1007},    {from: 1003, to: 1008},    {from: 1004, to: 1007},    {from: 1004, to: 1008},    {from: 1004, to: 1009},    {from: 1005, to: 1010},    {from: 1006, to: 1010},    {from: 1006, to: 1011},    {from: 1007, to: 1010},    {from: 1007, to: 1011},    {from: 1007, to: 1012},    {from: 1008, to: 1012},    {from: 1008, to: 1013},    {from: 1009, to: 1013},    {from: 1010, to: 1014},    {from: 1010, to: 1016},    {from: 1011, to: 1014},    {from: 1011, to: 1015},    {from: 1012, to: 1014},    {from: 1012, to: 1015},    {from: 1013, to: 1015},    {from: 1013, to: 1018},    {from: 1014, to: 1016},    {from: 1014, to: 1017},    {from: 1014, to: 1019},    {from: 1015, to: 1017},    {from: 1015, to: 1018},    {from: 1015, to: 1020},    {from: 1016, to: 1019},    {from: 1017, to: 1019},    {from: 1017, to: 1020},    {from: 1017, to: 1021},    {from: 1018, to: 1020},    {from: 1019, to: 1021},    {from: 1020, to: 1021},    {from: 1021, to: 1022},    {from: 1, to: 1001},    {from: 2, to: 1001},    {from: 3, to: 1002},    {from: 4, to: 1003},    {from: 5, to: 1003},    {from: 5, to: 1004},    {from: 6, to: 1004},];

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
            "size": 22,
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
            setValueTypeElement();
            document.getElementById('saveButton').onclick = saveData.bind(this, data, callback);
            document.getElementById('cancelButton').onclick = clearPopUp.bind();
            document.getElementById('network-popUp').style.display = 'block';

        },
    },
    "physics": {
        "enabled": false,
        "minVelocity": 0.75
    }
};
$('#saveButton').on('click', function(){
    if($('input[name="type"]:checked').val() == 'data') {
        network.body.data.counterData++;
    } else
    {
        network.body.data.counterNodes++;
    }
    console.log(network.body.data.counterData, network.body.data.counterNodes);
})
$('input[name="type"]').on('change', function() {
    setValueTypeElement();
})

function setValueTypeElement(){
    if($('input[name="type"]:checked').val() === 'data') {
        document.getElementById('node-id').value = network.body.data.counterData;
        document.getElementById('node-label').value = network.body.data.counterData;
    } else {
        document.getElementById('node-id').value = network.body.data.counterNodes;
        document.getElementById('node-label').value = network.body.data.counterNodes - 1000;
    }
}

var network = new vis.Network(container, data, options);
network.body.data.counterNodes = 1001;
network.body.data.counterData = 1;
var matrix = [];
var original_matrix = [];
function exportNetwork() {

    var nodesClear = objectToArray(network.getPositions());
    var infoNodes = network.body.data.nodes._data;

    for(var key in nodesClear) {
        nodesClear[key].label = infoNodes[nodesClear[key].id].label;
        nodesClear[key].shape = infoNodes[nodesClear[key].id].shape;
        nodes[nodesClear[key].id] = (nodesClear[key]);
    }
    console.log(nodes);
    // for (var i = 0; i <= network.body.data.nodes.length; i++) {
    //     matrix[i] = [];
    //     for (var y = 0; y <= network.body.data.nodes.length; y++) {
    //         matrix[i][y] = 0;
    //     }
    // }

    nodes.forEach(function(item, key, arr) {
        matrix[item.id] = [];
        original_matrix[item.id] = [];
        nodes.forEach(function(item_inner, key_inner, arr_inner) {
            matrix[item.id][item_inner.id] = 0;
            original_matrix[item.id][item_inner.id] = 0;
        })
    });


    nodes.forEach(addConnections);

    var arrayFromTo = network.body.data.edges._data;



    Object.keys(arrayFromTo).forEach(function (item, key, arr) {
        matrix[arrayFromTo[item].from][arrayFromTo[item].to] = 1;
        original_matrix[arrayFromTo[item].from][arrayFromTo[item].to] = 1;
    })
    console.log(matrix);
    drawTable(matrix);
    var potoks = createPotoks(matrix);
    displayPotoks(potoks);
    descriptionActors(original_matrix, potoks);

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
if(dataCount != null)
network.body.data.counterData = dataCount;
if(jsonCount != null)
network.body.data.counterNodes = jsonCount;
// Object.prototype.clonematrix = function() {
//     var newObj = (this instanceof Array) ? [] : {};
//     for (i in this) {
//         if (i == 'clone')
//             continue;
//         if (this[i] && typeof this[i] == "object") {
//             newObj[i] = this[i].clone();
//         }
//         else
//             newObj[i] = this[i]
//     } return newObj;
// };

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
    if($('input[name="type"]:checked').val() == 'data') {
        data.shape = "database";
    }
    clearPopUp();
    callback(data);
}

function displayPotoks(potoks)
{
    var form = $('#potoks');
    var html = '';
    for( var y = 0; y < potoks.length; y++) {
        html += '<li>M<span>' + y + '</span> = ';
        for( var i = 0; i < potoks[y].length; i++) {
            html += setNameData(potoks[y][i]);
            if(i != potoks[y].length-1)
                html += '-';
        }
        html += '</li>';
    }
    form.html(html);
}

function setNameData(key, flag) {
    var result = nodes[key].label;

    if(key < 1000 && !flag) {
        result = 'D' + result;
    }

    return result;
}

function drawTable(matrix) {
    var table_html = '';
    var thead_html = '<tr><td>-</td>';
    matrix.forEach(function (item, key, array) {
        thead_html += '<td>' + setNameData(key) + '</td>';
        table_html += '<tr><td>' + setNameData(key) + '</td>';
        matrix[key].forEach(function (inner_item, inner_key, inner_array) {
            table_html += '<td>' + inner_item + '</td>';
        })
        table_html += '</tr>';
    })
    thead_html += '</tr>';
    $('#empty-table').html(table_html);
    $('#empty-thead').html(thead_html);
}

function createNewPotok() {
    var potok = [];
    var flag_end_potok = 1;
    var next_row = 0;

    matrix.forEach(function(row_item, row_key, row_arr) {
        if(next_row === row_key || !next_row) {
            matrix[row_key].some(function (col_item, col_key, col_arr) {
                if (matrix[row_key][col_key] === 1) {
                    matrix.forEach(function (inner_row_item, inner_row_key, inner_row_arr) {
                        matrix[inner_row_key][col_key] = 0;
                    });
                    potok.push(col_key);
                    next_row = col_key;
                    return true;
                }
            });

        }
    });

    return potok;
}

function createPotoks() {
    var potok_arr = [];
    var potok = createNewPotok();
    while (potok.length > 0) {
        potok_arr.push(potok);
        potok = createNewPotok();
    }
    return potok_arr;

}



function descriptionActors(matrix_original, potoks) {

    var actors = [];
    var data = [];

    matrix_original.forEach(function (item, key, arr) {
        if(key > 1000) {
            actors[key] = 'M<span>';
            for(var i = 0; i < potoks.length; i++) {
                if(potoks[i].includes(key)) {
                    actors[key] += i;
                }
            }
            actors[key] += '</span>,I<span>' + setNameData(key) + '</span>,F<span>' + setNameData(key) + '</span>,';
            var count = 0;
            var substr = '';
            matrix_original[key].forEach(function(col_item, col_key, col_arr) {
                if(matrix_original[key][col_key] === 1) {
                    count++;
                    element = col_key;
                    for(var i = 0; i < potoks.length; i++) {
                        if(potoks[i].includes(element)) {
                            substr += ',I<span>' + setNameData(element) + '</span>,M<span>' + i + '</span>';
                        }
                    }
                }
            });
            actors[key] += count + substr + ',T<span>' + setNameData(key) + '</span>';
        } else {
            data[key] = 'Q<span>' + setNameData(key, true) + '</span>,';

            var count = 0;
            var substr = '';
            matrix_original[key].forEach(function(col_item, col_key, col_arr) {
                if(matrix_original[key][col_key] === 1) {
                    count++;
                    element = col_key;
                    for(var i = 0; i < potoks.length; i++) {
                        if(potoks[i].includes(element)) {
                            substr += ',I<span>' + setNameData(element) + '</span>,M<span>' + i + '</span>';
                        }
                    }
                }
            });

            data[key] += count + substr + ',T<span>' + key + '</span>';
        }
    });

    displayActors(actors, $('#actors'));
    displayActors(data, $('#data-generation'));
    return actors;
}

function displayActors(actors, form) {
    var html = '';
    actors.forEach(function (key, element, arr) {
        html += '<li>A<span>' + setNameData(element, true) + '</span> = ' + key + '</li>';
    });
    form.html(html);
}

function addNode(x,y) {
    if(x == null)
        x = 0;
    if(y == null) {
        y = 0;
    }
    try {
        nodes.add({
            id: Math.random(),
            borderWidth:1,
            shape:'database',
            x: x,
            y: y,
        });
    }
    catch (err) {
        alert(err);
    }

}



$(document).on('mousedown', '#data-source', function(){
    flag=true;
    index = 'data';
    $(document).one('mousemove', '#mynetwork', function(){
        if (flag){
            coordinate_X = event.offsetX - network.body.view.translation.x/network.body.view.scale;
            coordinate_Y = event.offsetY - network.body.view.translation.y/network.body.view.scale;
            addNode(coordinate_X,coordinate_Y);
        }

    });
    coordinate_X = 0;
    coordinate_Y = 0;
});



function objectToArrayWithoutKey(object) {
    var result = [];
    for(var key in object) {
        result.push(object[key]);
    }
    return JSON.stringify({info:result, count: network.body.data.counterData});
}

function setParamsNodes(nodes) {
    var result = [];
    var infoNodes = network.body.data.nodes._data;
    for( var key in nodes) {
        nodes[key].id = key;
        nodes[key].label = infoNodes[key].label;
        nodes[key].shape = infoNodes[key].shape;
        result.push(nodes[key]);
    }
    return result;
}

$('#saveProjects').submit(function(event) {

    var nodesFinaly = JSON.stringify({info:setParamsNodes(network.getPositions()), count:network.body.data.counterNodes});
    console.log(nodesFinaly);
    console.log(network.body.data.nodes._data)
    var dataFinally = objectToArrayWithoutKey(network.body.data.edges._data);
    console.log(dataFinally);
    var nodes = new vis.DataSet();
    $('#json').val(nodesFinaly);
    $('#data').val(dataFinally);

    return true;
});

$(document).ready(function () {
    exportNetwork();
})