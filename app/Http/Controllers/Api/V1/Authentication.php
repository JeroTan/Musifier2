<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\V1\Authenticate\SignupVerify;
use App\Mail\V1\WelcomeVerifyEmail;
use App\Models\Account;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Mail;

class Authentication extends Controller
{
    public function login(){

    }

    public function signWithGoogle(){

    }

    public function signup(SignupVerify $request){
        //Put it to database;
        $user = Account::create($request->only(['username', 'email', 'password']));

        //Queue Email for verification
        Mail::to($user->email)->queue( new WelcomeVerifyEmail($user->username, url("/")) );

        //create a token
        $token = $user->createToken($user->username);

        //Redirect With Verify Email and the token
        return response()->json(["message"=>"Success! Email verification is needed.", "token"=>$token], 201);
    }

    //Verifier
    public function signupVerify(SignupVerify $request){
        return response()->json("good", 200);
    }

}
