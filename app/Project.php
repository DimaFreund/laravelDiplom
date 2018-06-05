<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
	protected $fillable = ['name', 'json', 'data'];

	public function user()
	{
		return $this->belongsTo(User::class);
	}
}
