<?php

namespace App\Http\Entities;
use Illuminate\Database\QueryException;

use Illuminate\Database\Eloquent\Model;

class Channel extends Model
{
    protected $table = '_liveedu_channel';


    //Tạo kênh stream mới
    protected function create($partner_id){
      try{
          $this->partner_id = $partner_id;
          $this->encode_url = hash('ripemd160',time());
          $this->save();
      }catch(QueryException $ex){

      }

    }


}
