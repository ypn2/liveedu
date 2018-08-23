<?php
namespace App\Http\Controllers;
use Illuminate\Routing\Controller as BaseController;

use App\Http\Entities\Fields;


class FieldsController extends BaseController{
  /*
  |--------------------------------------------------------------------------
  | Fields Controller
  |--------------------------------------------------------------------------
  | Xử lý logic liên quan đến tạo và truy xuất lĩnh vực giảng dạy
  */

  public function list(){
    return Fields::list();
  }

}

?>
