<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

// Route::get('/', function () {
//     return view('welcome');
// });

Route::get('{query}',
  function() { return view('welcome'); })
  ->where('query', '.*');


Route::group(['middleware' => 'web', 'prefix' => 'api'], function () {
    Route::post('/register','Auth\RegisterController@create');
    Route::post('/login','Auth\LoginController@login');
    Route::post('/logout','Auth\LoginController@logout');
    Route::post('/check','Auth\LoginController@check');
    Route::post('/trainer-registration','TrainerController@register');

    Route::group(['middleware'=>'web','prefix'=>'fields'],function(){
      Route::post('list','FieldsController@list');
    });

    //Đăng ký và các xử lý liên quan đến partner (streammer)
    Route::group(['middleware'=>'web','prefix'=>'partner'] , function(){
      //Thành viên đăng ký streammer partner
      Route::post('register','PartnerController@register');
      Route::post('check','PartnerController@check');
      Route::post('active','PartnerController@activePartner');

      //Danh sách các streammer đã đăng ký nhưng chưa phê duyệt
      Route::post('list-registered','PartnerController@listRegistered');

    });

    Route::group(['middleware'=>'web','prefix'=>'course'],function(){
      Route::post('registered','CourseController@registered');
    });

    Route::group(['middleware'=>'web','prefix'=>'post'],function(){
      Route::post('create','PostController@create');
    });

    Route::group(['middleware'=>'web','prefix'=>'notification'],function(){
      Route::post('get','NotificationController@get');    
    });

    Route::group(['middleware'=>'web','prefix'=>'dashboard'],function(){
      Route::group(['middleware'=>'web','prefix'=>'course'],function(){
        Route::post('get-new-courses','CourseController@getNewCourses');
        Route::post('accept-registered-course','CourseController@acceptRegisteredCourse');
      });
    });

});

// Route::post('internal-document','Controller@internalDocument');
// Route::post('load-folder','Controller@load');
