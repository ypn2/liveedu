<?php

namespace App\Http\Controllers\Auth;

use Illuminate\Foundation\Auth\AuthenticatesUsers;
use Illuminate\Support\Facades\Validator;

use Illuminate\Support\Facades\Hash;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Input;
use Illuminate\Support\Facades\Auth;
use App\User;

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


    use AuthenticatesUsers;

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


      $validator = $this->validator($data);
      if($validator->fails()){
        return json_encode([
          'code'=>'301',
          'message'=>$validator->messages()
        ]);
      }

      $user = User::where('email',$data['log_email'])->first();

      if(!$user){
        return json_encode([
          'code'=>'301',
          'message'=>[
            'log_email'=>'Email chưa được đăng ký'
          ]
        ]);
      }

      if(!Hash::check($data['log_password'], $user->password)){
        return json_encode([
          'code'=>'301',
          'message'=>[
            'log_password'=>'Mật khẩu bạn nhập chưa chính xác'
          ]
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

      return json_encode([
        'code'=>'301',
        'message'=>'Lỗi chưa xác định'
      ]);

    }

    public function check(){
      return '' . Auth::check();
    }

    public function Logout(){
      if(Auth::check()){
        Auth::logout();
          return 1;
      }

      return 0;

    }

    protected function sendFailedLoginResponse(Request $request)
    {
        $errors = [$this->username() => trans('auth.failed')];

        // Load user from database
        $user = User::where($this->username(), $request->{$this->username()})->first();

        // Check if user was successfully loaded, that the password matches
        // and active is not 1. If so, override the default error message.
        if ($user && \Hash::check($request->password, $user->password) && $user->active != 1) {
            $errors = [$this->username() => trans('auth.notactivated')];
        }

        if ($request->expectsJson()) {
            return response()->json($errors, 422);
        }
        return redirect()->back()
            ->withInput($request->only($this->username(), 'remember'))
            ->withErrors($errors);
    }

}
