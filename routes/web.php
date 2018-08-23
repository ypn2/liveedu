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
      Route::post('register','PartnerController@register');
      Route::post('check','PartnerController@check');
    });

});

// Route::post('internal-document','Controller@internalDocument');
// Route::post('load-folder','Controller@load');
