@extends('layouts.app')

@section('content')
<div class="container">
    <h3>My projects</h3>
    <br>
    <a href="/home/create" class="btn btn-success">Create</a>
    <br>
    <br>
    <div class="row">
        <div class="col-md-10 col-md-offset-1">
            <table class="table">
                <thead>
                <tr>
                    <td>ID</td>
                    <td>Title</td>
                    <td>Date creation</td>
                    <td>Actions</td>
                </tr>
                </thead>
                <tbody>
                @foreach($projects as $project)
                <tr>
                    <td>{{$project->id}}</td>
                    <td><a href="{{route('home.show', $project->id)}}">{{$project->name}}</a></td>
                    <td>{{$project->created_at}}</td>
                    <td>
                        <a class="btn btn-warning" href="{{route('home.show', $project->id)}}"><i class="glyphicon glyphicon-eye-open">open</i></a>
                        <a class="btn btn-dark" href="{{route('home.edit', $project->id)}}"><i class="glyphicon glyphicon-edit">edit</i></a>
                        <form style="display: inline-block" action="/home/{{$project->id}}/destroy" method="post">
                            <div class="form-group">
                                {{csrf_field()}}
                                {{ method_field('post') }}
                                <input type="hidden" class="form-control" name="id" value="{{$project->id}}">
                                <br>
                                <button class="btn btn-danger">remove</button>
                            </div>
                        </form>
                    </td>
                </tr>
                    @endforeach
                </tbody>
            </table>
        </div>
    </div>
</div>
@endsection
