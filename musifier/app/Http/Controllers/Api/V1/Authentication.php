<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\V1\Authenticate\SignupVerify;
use Illuminate\Http\Request;

class Authentication extends Controller
{
    public function login(){

    }

    public function signWithGoogle(){

    }

    public function signup(){

    }

    //Verifier
    public function signupVerify(SignupVerify $request){
        return response()->json("good", 200);
    }

}
