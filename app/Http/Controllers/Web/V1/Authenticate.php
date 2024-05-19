<?php

namespace App\Http\Controllers\Web\V1;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class Authenticate extends Controller
{
    public function  verifyEmail(Request $request){//Verify the email here

        //Check the hash
            //If invalid or expired then return a page that verification have expired
        //Get the id accounts details and update the emailVerifiedAt
        //Return a view that your account is verified visit the homepage here.
    }
}
