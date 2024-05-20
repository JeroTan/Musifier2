<?php

namespace App\Http\Controllers\Api\V1;

use App\Helpers\Generator;
use App\Helpers\Parser;
use App\Http\Controllers\Controller;
use App\Http\Requests\Api\V1\Authenticate\Login;
use App\Http\Requests\Api\V1\Authenticate\Signup;
use App\Http\Requests\Api\V1\Authenticate\SignupVerify;
use App\Mail\V1\WelcomeVerifyEmail;
use App\Models\Account;
use App\Models\AccountVerification;
use Carbon\Carbon;
use Google_Client;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Crypt;
use Illuminate\Support\Facades\Mail;




class Authentication extends Controller
{
    public function login(Login $request){
        //Check whether either email or username
        $user = Account::where("email", $request->usernameEmail)->first();
        $credentials = ["email"=>$request->usernameEmail, "password"=>$request->password];
        if(!$user){
            $user = Account::where("username", $request->usernameEmail)->first();
            $credentials = ["username"=>$request->usernameEmail, "password"=>$request->password];
        }

        //Authenticate
        if(!Auth::attempt($credentials)){
            //Redirect 401 if it did not match
            return response(status: 401);
        }

        //Set Web session
        //Auth::guard("web")->login(Auth::user()); //Even This
        //session()->regenerate(); //Since this is an api

        //Create Token
        $user = Auth::user();
        if($user instanceof Account)
            $token = $user->createToken($user->username)->plainTextToken;

        //Set default Login Notification if any
        $notify = "";

        //Check if email is not yet verified.
        if(!$user->emailVerifiedAt)
            //Modify Login Message
            $notify = "We have sent an email to $user->email in order for us to verify your account.";

        //Redirect With token and Login Message with 201 status code
        return response()->json(["notify"=>$notify, "token"=>$token], 201);
    }

    public function signup(Signup $request){
        //Put it to database;
        $user = Account::create($request->only(['username', 'email', 'password']));

        //Attempt to authenticate
        $result = Auth::attempt($request->only(["username", "password"]));

        //Set Session for Web Request
        //Auth::guard("web")->login(Auth::user()); //Even This
        //session()->regenerate(); //Since this is an api

        //Make a verification record;
        $verificationRecord = new AccountVerification;
        $verificationRecord->account()->associate($user);
        $verificationRecord->key = Crypt::encryptString($user->email);
        $verificationRecord->purpose  = "email";
        $verificationRecord->save();

        //Queue Email for verification
        Mail::to($user->email)->queue( new WelcomeVerifyEmail($user->username, url("/verify_email/?q=".$verificationRecord->key)) );

        //create a token
        $token = $user->createToken($user->username)->plainTextToken;

        //Redirect With Verify Email and the token
        return response()->json(["notify"=>"We have sent an email to $user->email in order for us to verify your account.", "token"=>$token], 201);
    }

    public function signWithGoogle(Request $request){

        //Define Google Client ID
        $clientId = env("GOOGLE_CLIENT_ID");

        //Get the instance of Google Api Framework and insert the client Id
        $google = new Google_Client(['client_id' => $clientId]);  // Specify the CLIENT_ID of the app that accesses the backend

        //Verify the Credentials of a user that login in with google
        $userData = $google->verifyIdToken($request->credential);

            //Return a response if failed
            if(!$userData)
                return response()->json(["error"=>"Invalid Credentials"], 401);

        //Check in the database if the email exist
        $user = Account::where("email", $userData["email"])->first();

        //Check whether user is already existed in the database;
        if($user)
            goto checkingEmail;

            //And insert it here since it is not available
            $user = new Account;
            $user->username = Parser::noSpaces( substr($userData["name"], 0, 12) ).Generator::id();
            $user->password = Generator::id(idLength: 12);
            $user->email = $userData["email"];
            $user->emailVerifiedAt = Carbon::now("Asia/Manila");
            $user->picture = $userData["picture"]; //If accessing just check if it relative or absolute;
            $user->displayName = $userData["name"];
            $user->save();

        checkingEmail:
        //Check if userData email is verified
        if(!$user->emailVerifiedAt){
            $user->emailVerifiedAt = Carbon::now("Asia/Manila");
            $user->save();
        }


        //Authenticate it
        Auth::attempt(["email"=>$user->email, "password"=>$user->password]);

        //Make a token
        $token = $user->createToken($user->username)->plainTextToken;

        //Redirect With Verify Email and the token
        return response()->json(["token"=>$token], 201);
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
        // Auth::guard("web")->logout();
        // session()->invalidate();
        return response()->json("Logout Successfully", 201);
    }

}
