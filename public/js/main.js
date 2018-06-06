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
var original_matrix = [];
function exportNetwork() {

    var nodes = objectToArray(network.getPositions());

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

    console.log(matrix);

    nodes.forEach(addConnections);
    // console.log(nodes);

    var arrayFromTo = network.body.data.edges._data;



    Object.keys(arrayFromTo).forEach(function (item, key, arr) {
        matrix[arrayFromTo[item].from][arrayFromTo[item].to] = 1;
        original_matrix[arrayFromTo[item].from][arrayFromTo[item].to] = 1;
    })

    drawTable(matrix);
    var potoks = createPotoks(matrix);
    console.log(potoks);
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
    clearPopUp();
    callback(data);
}

function displayPotoks(potoks)
{
    var form = $('#potoks');
    var html = '';
    for( var y = 0; y < potoks.length; y++) {
        html += '<li>';
        for( var i = 0; i < potoks[y].length; i++) {
            html += potoks[y][i];

            html += '-';
        }
        html += '</li>';
    }
    form.html(html);
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
    console.log(potok_arr);
    return potok_arr;

}



function descriptionActors(matrix_original, potoks) {

    var actors = [];
    var data = [];

    matrix_original.forEach(function (item, key, arr) {
        if(key > 1000) {
            actors[key] = 'M(';
            for(var i = 0; i < potoks.length; i++) {
                if(potoks[i].includes(key)) {
                    actors[key] += i;
                }
            }
            actors[key] += '),I(' + key + '),F(' + key + '),';
            var count = 0;
            var substr = '';
            matrix_original[key].forEach(function(col_item, col_key, col_arr) {
                if(matrix_original[key][col_key] === 1) {
                    count++;
                    element = col_key;
                    for(var i = 0; i < potoks.length; i++) {
                        if(potoks[i].includes(element)) {
                            substr += ',I(' + element + '),M(' + i + ')';
                        }
                    }
                }
            });
            actors[key] += count + substr + ',T(' + key + ')';
        } else {
            data[key] = 'Q' + key + ',';

            var count = 0;
            var substr = '';
            matrix_original[key].forEach(function(col_item, col_key, col_arr) {
                if(matrix_original[key][col_key] === 1) {
                    count++;
                    element = col_key;
                    for(var i = 0; i < potoks.length; i++) {
                        if(potoks[i].includes(element)) {
                            substr += ',I(' + element + '),M(' + i + ')';
                        }
                    }
                }
            });

            data[key] += count + substr + ',T(' + key + ')';
        }
    });

    console.log(actors);
    console.log(data);
    displayActors(actors, $('#actors'));
    displayActors(data, $('#data-generation'));
    return actors;
}

function displayActors(actors, form) {
    var html = '';
    actors.forEach(function (key, element, arr) {
        console.log(key);
        html += '<li>' + key + '</li>';
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
            console.log(network.body.view.translation);
            console.log(coordinate_X + '--' + coordinate_Y);
            console.log(network);
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
    result.pop();
    return JSON.stringify(result);
}

function setParamsNodes(nodes) {
    var result = [];
    for( var key in nodes) {
        nodes[key].id = key;
        nodes[key].label = key;
        result.push(nodes[key]);
    }
    result.pop();
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

$(document).ready(function () {
    exportNetwork();
})