<?php
namespace App\Http\Controllers;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Support\Facades\Auth;

use App\Http\Entities\Fields;


class NotificationController extends BaseController{
  /*
  |--------------------------------------------------------------------------
  | Notifications
  |--------------------------------------------------------------------------
  | Xử lý logic liên quan đến thông báo
  */


  //Truy xuất tất cả thông báo của user
  public function get(){
    $user = Auth::user();
    return json_encode([
      'unread'=>count($user->notifications),
      'all'=>$user->unreadNotifications
    ]);
  }

}

?>
