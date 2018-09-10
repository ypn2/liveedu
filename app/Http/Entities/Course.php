<?php

namespace App\Http\Entities;
use Illuminate\Database\QueryException;
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;
use DB,Eloquent;

use App\Http\Entities\Partner;

class Course extends Model
{
    protected $table = '_liveedu_course';


    protected function partner(){
      return $this->belongsTo('App\Http\Entities\Partner','partner_id');
    }


    //Streammer partner gửi đăng ký khóa học mới.
    protected function register($data){

      $alias = str_slug($data->name,'_');
      $table_name = '_ex_ls_' . hash('ripemd160',time());

      try{

        $lessons = Schema::create($table_name, function (Blueprint $table) {
            $table->increments('id');
            $table->string('title',255);
            $table->text('description');
            $table->timestamps();

            $table->engine = 'InnoDB';

        });

        foreach($data->curriculumn as $k=>$lesson){
          DB::table($table_name)->insert([
            'title'=>$lesson['name'],
            'description'=>$lesson['desc'],
            'created_at' => \Carbon\Carbon::now(),
            'updated_at' => \Carbon\Carbon::now()
          ]);
        }

        $this->name = $data->name;
        $this->partner_id =  Auth::id();
        $this->fields = serialize($data->fields);
        $this->description = $data->course_desc;
        $this->course_target = $data->course_target;
        $this->course_price = $data->course_price;
        $this->lesson_price = $data->lesson_price;
        $this->pre_required = $data->pre_required;
        $this->curriculumn = $table_name;
        $this->save();

        return json_encode([
          'code'=>200,
          'message'=>'success'
        ]);

      }
      catch(QueryException $ex){
        //Log lỗi
        return json_encode([
          'code'=>301,
          'message'=>'Lỗi chưa xác định'
        ]);

      }

    }

    //Lấy danh sách tất cả các khóa học theo trạng thái
    protected function getCourses($status){
      $courses =  $this->where('active',$status)->get();

      foreach($courses as $c){
        $c->partner_current_job = $c->partner->current_job;
        $c->partner_name = $c->partner->user->name;
      }

      return $courses;
    }

}
