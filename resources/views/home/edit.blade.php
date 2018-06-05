@extends('layouts.app')

@section('content')
    <div class="container">
        <h3>Edit project # - {{$project->id}}</h3>
        <div class="row">
            <div class="col-md-12">
                <form action="/home/{{$project->id}}/update" method="post">
                    <div class="form-group">
                        {{csrf_field()}}
                        {{ method_field('post') }}
                        <input type="text" class="form-control" name="name" value="{{$project->name}}">
                        <input type="text" name="json" class="form-control" value="{{$project->json}}">
                        <br>
                        <button class="btn btn-warning">Submit</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
@endsection
