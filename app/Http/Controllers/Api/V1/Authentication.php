<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\V1\Authenticate\Signup;
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
    public function signup(Signup $request){
        //Put it to database;
        $user = Account::create($request->only(['username', 'email', 'password']));

        //Attempt to authenticate

        $result = Auth::attempt($request->only(["username", "password"]));
        Auth::guard("web")->login(Auth::user());

        //Queue Email for verification
        Mail::to($user->email)->queue( new WelcomeVerifyEmail($user->username, url("/")) );

        //create a token
        $token = $user->createToken($user->username)->plainTextToken;

        //Redirect With Verify Email and the token
        return response()->json(["message"=>"We have sent an email to $user->email in order for us to verify your account.", "token"=>$token], 201);
    }
    public function signWithGoogle(){

    }

    public function  verifyEmail(Request $request){//Verify the email here
        //Check the hash
            //If invalid or expired then return a page that verification have expired
        //Get the id accounts details and update the emailVerifiedAt
        //Return a view that your account is verified visit the homepage here.
    }

    //Verifier
    public function signupVerify(SignupVerify $request){
        return response()->json("good", 200);
    }

    //Others
    public function logout(Request $request){
        $user = Auth::user();
        if($user instanceof Account){
            $user->tokens()->delete();
        }
        Auth::guard("web")->logout();
        return response()->json("Logout Successfully", 201);
    }

}
