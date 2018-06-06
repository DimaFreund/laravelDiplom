
@extends('layouts.app')

@section('content')
    <div class="container">
        <h3>Edit project # - {{$project->id}}</h3>
        <div class="row">
            <div class="col-md-12">
                <form id="saveProjects" action="/home/{{$project->id}}/update" method="post">
                    <div class="form-group">
                        {{csrf_field()}}
                        {{ method_field('post') }}
                        <input type="text" class="form-control" name="name" value="{{$project->name}}">
                        <input id="json" type="hidden" name="json" class="form-control" value="{{$project->json}}">
                        <input id="data" type="hidden" name="data" class="form-control" value="{{$project->data}}">
                        <br>
                        <button class="btn btn-warning">Submit</button>
                    </div>
                </form>
            </div>
        </div>
    </div>





    <div class="container">
            <p>
                <br>
                Create a simple network with some nodes and edges.
            </p>
            <input class="btn-lg" type="button" id="export_button" onclick="exportNetwork()" value="export">
            <br>
            <div id="network-popUp">
                <span id="operation">node</span> <br>
                <table style="margin:auto;">
                    <tr>
                        <td>id</td>
                        <td><input id="node-id" value="new value"/></td>
                    </tr>
                    <tr>
                        <td>label</td>
                        <td><input id="node-label" value="new value"/></td>
                    </tr>
                </table>
                <input type="button" value="save" id="saveButton"/>
                <input type="button" value="cancel" id="cancelButton"/>
            </div>
            <br/>
            <div id="mynetwork"></div>

        <div class="table-section">
            <div class="container">
                <h2>Bordered Table</h2>
                <p>The .table-bordered class adds borders to a table:</p>
                <div class="table-responsive">
                    <table class="table table-bordered table-hover active">
                        <thead id="empty-thead"></thead>
                        <tbody id="empty-table"></tbody>
                    </table>
                </div>
            </div>
        </div>
        <div class="potoks-section">
            <br>
            <h3>Potoks</h3>
            <ul id="potoks"></ul>
        </div>
        <div class="actors-section">
            <br>
            <h3>Actors</h3>
            <ul id="actors"></ul>
        </div>
        <div class="data-section">
            <br>
            <h3>Data</h3>
            <ul id="data-generation"></ul>
        </div>
    </div>

@endsection