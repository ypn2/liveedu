<?php

namespace App\Http\Entities;
use Illuminate\Database\QueryException;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;
use App\Notifications\PartnerRegistration;
use App\Http\Entities\Channel;
use App\Notifications\ActivePartner;
use App\User;
use DB,Eloquent;

class Partner extends Model
{
    protected $table = '_liveedu_partners';

    protected function user(){
      return $this->belongsTo('App\http\Entities\User','user_id');
    }

    protected function course(){
      return $this->hasMany('App\Http\Entities\Course','parner_id');
    }

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
    protected function activePartner($id){
      $partner = $this->where('id',$id)->first();
      $user = User::find($partner->user_id);

      if($partner && $partner->status==0 && $user){
        try{
          DB::beginTransaction();
          Channel::create($partner->id);
          $partner->status = 1;
          $partner->save();
          $user->notify(new ActivePartner());
          DB::commit();

          return json_encode([
            'code'=>200,
            'status'=>'success',
            'message'=>'Kích hoạt tài khoản stream partner thành công'
          ]);

        }catch(QueryException $ex){

          DB::rollBack();

          return json_encode([
            'code'=>400,
            'status'=>'Bad request',
            'message'=>'Lỗi active streammer partner'
          ]);
        }
      }

      return json_encode([
        'code'=>400,
        'status'=>'Bad request',
        'message'=>'Stream partner đã được active'
      ]);
    }

    /*
    /called:PartnerController@listRegistered
    */
    protected function list(){
      $data = $this->join('users','users.id','=','_liveedu_partners.user_id')
                  ->select('name','users.id as user_id','current_job','_liveedu_partners.id as partner_id')
                  ->get();

      if($data){
        return json_encode([
          'code'=>200,
          'status'=>'success',
          'data'=>$data
        ]);
      }

      return json_encode([
        'code'=>400,
        'status'=>'Bad request',
        'message'=>'Lỗi truy xuất danh sách đối tác đang đăng ký'
      ]);
    }

}
