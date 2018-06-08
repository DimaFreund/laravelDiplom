@extends('layouts.app')

@section('content')
    <div class="container">
        <h3>Create task</h3>
        <div class="row">
            <div class="col-md-12">
                {!! Form::open(['route' => ['home.store'], 'id' => 'saveProjects']) !!}
                <div class="form-group">

                    <input placeholder="Name project" type="text" class="form-control" name="name">
                    @foreach ($errors->all() as $error)
                        <br>
                        <span class="alert alert-danger">{{ $error }}</span>
                        <br>
                    @endforeach
                    <input id="json" type="hidden" name="json" class="form-control">
                    <input id="data" type="hidden" name="data" class="form-control">
                    <br>
                    <button class="btn btn-success">Submit</button>

                </div>
                {!! Form::close() !!}
            </div>
        </div>
    </div>





<div class="container">
    <div class="">
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
                    <input type="hidden" id="node-id" value="new value"/>
                    <label for="choiceNodes">Актор</label>
                    <input checked type="radio" name="type" for="choiceActors" value="actors">

                    <label for="choiceEdges">Дані</label>
                    <input type="radio" name="type" for="choiceData" value="data">
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

    </div>
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