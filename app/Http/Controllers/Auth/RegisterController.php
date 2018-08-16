<?php

namespace App\Http\Controllers\Auth;

use App\User;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Foundation\Auth\RegistersUsers;
use Illuminate\Support\Facades\Input;

class RegisterController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Register Controller
    |--------------------------------------------------------------------------
    |
    | This controller handles the registration of new users as well as their
    | validation and creation. By default this controller uses a trait to
    | provide this functionality without requiring any additional code.
    |
    */

    use RegistersUsers;

    /**
     * Where to redirect users after registration.
     *
     * @var string
     */
    protected $redirectTo = '/home';

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('guest');
    }

    /**
     * Get a validator for an incoming registration request.
     *
     * @param  array  $data
     * @return \Illuminate\Contracts\Validation\Validator
     */
    protected function validator(array $data)
    {
        return Validator::make($data, [
            'reg_first_name' => 'required|string|max:255',
            'reg_last_name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'reg_password' => 'required|string|min:6',
            'reg_retype_password' => 'required|string|min:6|same:reg_password',
        ]);
    }

    /**
     * Create a new user instance after a valid registration.
     *
     * @param  array  $data
     * @return \App\User
     */
    protected function create()
    {
        $data = Input::all();
        $validator = $this->validator($data);
        if($validator->fails()){
          return json_encode([
            'code'=>'301',
            'message'=>$validator->messages()
          ]);
        };

        return User::create([
            'name' => $data['reg_first_name'] .' ' . $data['reg_last_name'],
            'email' => $data['email'],
            'password' => Hash::make($data['reg_password']),
        ]);
    }
}
