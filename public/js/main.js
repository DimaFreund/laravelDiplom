// create an array with nodes
var nodes = new vis.DataSet([
    {id: 1, label: '1', x: -300, y: -450},
    {id: 2, label: '2', x: -150, y: -450},
    {id: 3, label: '3', x: 0, y: -450},
    {id: 4, label: '4', x: 150, y: -450},
    {id: 5, label: '5', x: -375, y: -300},
    {id: 6, label: '6', x: -225, y: -300},
    {id: 7, label: '7', x: -75, y: -300},
    {id: 8, label: '8', x: 75, y: -300},
    {id: 9, label: '9', x: 225, y: -300},
    {id: 10, label: '10', x: -300, y: -150},
    {id: 11, label: '11', x: -150, y: -150},
    {id: 12, label: '12', x: -0, y: -150},
    {id: 13, label: '13', x: 150, y: -150},
    {id: 14, label: '14', x: -150, y: 0},
    {id: 15, label: '15', x: 0, y: 0},
    {id: 16, label: '16', x: -225, y: 150},
    {id: 17, label: '17', x: -75, y: 150},
    {id: 18, label: '18', x: 75, y: 150},
    {id: 19, label: '19', x: -150, y: 300},
    {id: 20, label: '20', x: 0, y: 300},
    {id: 21, label: '21', x: -75, y: 450},
    {id: 22, label: '22', x: -75, y: 600},
]);

// create an array with edges
var edges = new vis.DataSet([
    {from: 1, to: 5},
    {from: 1, to: 6},
    {from: 2, to: 6},
    {from: 3, to: 6},
    {from: 3, to: 7},
    {from: 3, to: 8},
    {from: 4, to: 7},
    {from: 4, to: 8},
    {from: 4, to: 9},
    {from: 5, to: 10},
    {from: 6, to: 10},
    {from: 6, to: 11},
    {from: 7, to: 10},
    {from: 7, to: 11},
    {from: 7, to: 12},
    {from: 8, to: 12},
    {from: 8, to: 13},
    {from: 9, to: 13},
    {from: 10, to: 14},
    {from: 10, to: 16},
    {from: 11, to: 14},
    {from: 11, to: 15},
    {from: 12, to: 14},
    {from: 12, to: 15},
    {from: 13, to: 15},
    {from: 13, to: 18},
    {from: 14, to: 16},
    {from: 14, to: 17},
    {from: 14, to: 19},
    {from: 15, to: 17},
    {from: 15, to: 18},
    {from: 15, to: 20},
    {from: 16, to: 19},
    {from: 17, to: 19},
    {from: 17, to: 20},
    {from: 17, to: 21},
    {from: 18, to: 20},
    {from: 19, to: 21},
    {from: 20, to: 21},
    {from: 21, to: 22},
]);

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

$('#saveProjects').submit(function(event) {
    alert();
    console.log('auuuuuu');
});