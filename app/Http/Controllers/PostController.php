<?php
namespace App\Http\Controllers;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Database\QueryException;
use Illuminate\Support\Facades\Hash;
use Illuminate\Http\Request;
use App\Http\Entities\Post;
use Illuminate\Support\Facades\Validator;


class PostController extends BaseController{
  /*
  |--------------------------------------------------------------------------
  | Fields Controller
  |--------------------------------------------------------------------------
  | Xử lý logic liên quan đến tạo và truy xuất lĩnh vực giảng dạy
  */

  protected function validator(array $data){
    return Validator::make($data, [
        'title' => 'required|string|max:255',
        'postContent'=>'required'

    ]);
  }

  public function create(Request $request){

    $validator = $this->validator($request->all());

    if($validator->fails()){
      return json_encode([
        'code'=>'301',
        'message'=>$validator->messages()
      ]);
    };

    return Post::create($request);

  }

}

?>
