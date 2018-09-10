<?php
namespace App\Http\Controllers;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Database\QueryException;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;
use App\Http\Entities\Course;


class CourseController extends BaseController{
  /*
  |--------------------------------------------------------------------------
  | Fields Controller
  |--------------------------------------------------------------------------
  | Xử lý logic liên quan đến tạo và truy xuất khóa học
  */


  protected function validator(array $data)
  {
      return Validator::make($data, [
          'name' => 'required|string|max:255',
          'course_price' => 'required|numeric|max:1000000000',
          'lesson_price' => 'required|numeric|max:1000000000',
          'course_desc' => 'required|string|min:6',
          'course_target' => 'required|string|min:6',
          'pre_required' => 'required|string|min:6',
          'curriculumn'=>'required|array'
      ]);
  }

  public function registered(Request $request){

    $validator = $this->validator($request->all());

    if($validator->fails()){
      return json_encode([
        'code'=>300,
        'message'=>$validator->messages()
      ]);
    };

    $result = Course::register($request);

    return $result;
  }

  //Lấy thông tin tất cả các khóa học đang trong trạng thái gửi đăng ký
  public function getNewCourses(){

    //các khóa học trọng trạng thái vừa gửi đăng ký chờ phê duyệt có trạng thái =0
    return Course::getCourses(1);
  }

}

?>
