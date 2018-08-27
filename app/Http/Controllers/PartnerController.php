<?php
namespace App\Http\Controllers;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Http\Request;
use App\Http\Entities\Partner;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;


class PartnerController extends BaseController{
  /*
  |--------------------------------------------------------------------------
  | Partner Controller
  |--------------------------------------------------------------------------
  | Xử lý logic liên quan đến partner (streammer)
  */

  protected function validator(array $data)
  {
      return Validator::make($data, [
          'reg_fields'=>'required|string|max:100|',
          'reg_current_job' => 'required|string|max:255|',
          'reg_current_org' => 'required|string|max:255',
          'reg_phone'=>'required|string|max:15',
          'reg_own_introduce'=>'required'
      ]);
  }


  public function register(Request $request){

    $validator = $this->validator($request->all());
    if($validator->fails()){
      return json_encode([
        'code'=>'301',
        'message'=>$validator->messages()
      ]);
    }

    return Partner::register($request);
  }

  public function check(){
    return Partner::check(Auth::id());
  }

  public function activePartner(Request $request){
    return Partner::activePartner($request->id);
  }


  /*route::api/partner/list-registered
  /Load danh sách streammer partner đã đăng ký nhưng chưa duyệt
  */
  public function listRegistered(){
    return Partner::list();
  }

}

?>
