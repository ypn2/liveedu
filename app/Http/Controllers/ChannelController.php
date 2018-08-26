<?php
namespace App\Http\Controllers;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Database\QueryException;
use Illuminate\Support\Facades\Hash;

use App\Http\Entities\Channel;


class ChannelController extends BaseController{
  /*
  |--------------------------------------------------------------------------
  | Fields Controller
  |--------------------------------------------------------------------------
  | Xử lý logic liên quan đến tạo và truy xuất lĩnh vực giảng dạy
  */

  public function create($partner_id){
    try{
      $this->partner_id = $partner_id;
      $this->encode_url = Hash::make(time());
      $this->save();
    }catch(QueryException $ex){
      return 'errr';
    }

  }


}

?>
