<?php

namespace App\Http\Entities;

use Illuminate\Database\Eloquent\Model;

class Fields extends Model
{
    protected $table = '_liveedu_fields';


    protected function list(){
      return $this->select('id','title','alias')->get();
    }
}
