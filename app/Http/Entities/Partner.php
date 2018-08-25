<?php

namespace App\Http\Entities;
use Illuminate\Database\QueryException;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;
use App\Notifications\PartnerRegistration;
use App\Http\Entities\Channel;
use App\Notifications\ActivePartner;
use DB;

class Partner extends Model
{
    protected $table = '_liveedu_partners';

    protected function register($data){

      try{
        $result = $this->insert([
          'current_job'=>$data['reg_current_job'],
          'user_id'=>Auth::id(),
          'status'=>0,
          'fields'=>'Lập trình',
          'current_org'=>$data['reg_current_org'],
          'phone'=>$data['reg_phone'],
          'fb'=>$data['reg_fb'],
          'own_introduce'=>$data['reg_own_introduce']
        ]);

        if($result){

          $user = Auth::user();

          $user->notify(new PartnerRegistration());

          return json_encode([
            'code'=>200,
            'status'=>'success',
            'message'=>'register new partner'
          ]);
        }
      }
      catch(QueryException $ex){
        return json_encode([
          'code'=>400,
          'status'=>'Bad request',
          'message'=>$ex->errorInfo
        ]);
      }

      return json_encode([
        'code'=>400,
        'status'=>'Bad request',
        'message'=>'Not determine error'
      ]);

    }

    //Kiểm tra user đã đăng ký làm đối tác hay chưa
    protected function check($user_id){
      $partner = $this->where('user_id',$user_id)->first();

      if($partner){
        if($partner->status == 0){
          return json_encode([
            'status'=>0,
            'message'=>'Thông tin partner đang được phê duyệt!'
          ]);
        }else{
          return json_encode([
            'status'=>1,
            'message'=>'User đã trở thành partner'
          ]);
        }
      }

      return json_encode([
        'status'=>-1,
        'message'=>'Thành viên chưa đăng kí streammer partner'
      ]);
    }

    //Xác nhận đăng ký partner thành công
    protected function activePartner($user_id){
      $partner = $this->where('user_id',$user_id)->first();
      $user = Auth::find($user_id);

      if($partner && $user){

        try{
          DB:transaction(function(){
            Channel::create($partner->id);
            $partner->status = 1;
            $partner->save();
            $user->notify(new ActivePartner() );
          });
        }catch(QueryException $ex){

        }
      }
    }

}