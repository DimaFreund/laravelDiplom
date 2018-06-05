@extends('layouts.app')

@section('content')
    <div class="container">
        <div class="row">
            <div class="col-md-12">
                <br>
                <h3>{{$project->name}}</h3>
                <br>
                <p>{{$project->json}}</p>
            </div>
        </div>
    </div>
@endsection
