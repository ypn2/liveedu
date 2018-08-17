<?php

namespace App\Http\Controllers\Auth;

use Illuminate\Foundation\Auth\AuthenticatesUsers;
use Illuminate\Support\Facades\Validator;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Input;
use Illuminate\Support\Facades\Auth;

class LoginController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Login Controller
    |--------------------------------------------------------------------------
    |
    | This controller handles authenticating users for the application and
    | redirecting them to your home screen. The controller uses a trait
    | to conveniently provide its functionality to your applications.
    |
    */

    protected function validator(array $data)
    {
        return Validator::make($data, [
            'log_email' => 'required|string|email|max:255|',
            'log_password' => 'required|string|min:6',
        ]);
    }


    use AuthenticatesUsers;

    /**
     * Where to redirect users after login.
     *
     * @var string
     */

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function login()
    {

      $data = Input::all();

      return 'success';

      $validator = $this->validator($data);
      if($validator->fails()){
        return json_encode([
          'code'=>'301',
          'message'=>$validator->messages()
        ]);
      }

      if (Auth::attempt(
        [
          'email' => $data['log_email'],
          'password' => $data['log_password']
        ],
        true
      )){
        return 'success';
      }

      return 'fails';

    }

    public function check(){
      if(Auth::check()){
        return 1;
      }

      return 0;
    }
}
