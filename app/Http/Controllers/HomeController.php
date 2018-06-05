<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Project;
use Auth;
use DB;

class HomeController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth');
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
	    $projects = DB::table('projects')->where('creator', '=', Auth::user()->id)->get();
        return view('home.index', ['projects' => $projects]);
    }

    public function show($id)
    {
        $project = Project::find($id);

    	return view('home.show', ['project' => $project]);
    }

    public function create()
    {

    	return view('home.create');
    }

    public function edit($id)
    {
        $project = Project::find($id);

        return view('home.edit', ['project' => $project]);
    }

    public function update(Request $request, $id)
    {
        $project = Project::find($id);
        $project->fill($request->all());
        $project->save();

    	return redirect()->route('home.index');
    }

    public function store(Request $request)
    {
        $project = new Project;
        $project->fill($request->all());
        $project->creator = Auth::user()->id;

        $project->save();

        return redirect()->route('home.index');
    }

    public function destroy($id)
    {
        Project::find($id)->delete();
        return redirect()->route('home.index');
    }
}
