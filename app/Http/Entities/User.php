<?php

namespace App\Http\Entities;
use Illuminate\Database\QueryException;

use Illuminate\Database\Eloquent\Model;
use Eloquent;

class User extends Eloquent
{
    protected $table = 'users';

    public function partner(){
      return $this->hasOne('App\http\Entities\Partner');
    }

}
