<?php

namespace App\Http\Controllers\Web\V1;

use App\Helpers\Query;
use App\Http\Controllers\Controller;
use App\Models\AccountVerification;
use Carbon\Carbon;
use Illuminate\Contracts\Encryption\DecryptException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Crypt;

class Authenticate extends Controller
{
    public function  verifyEmail(Request $request){//Verify the email here
        //Sanitize Query
        $query = (new Query($request->query()))->filled(["q"])->get();

        //Decrypt data
        try{
            if( !isset($query["q"]) )
                throw new DecryptException("Invalid link, please refer to the actual link you received from the email and please do not modify the link.");
            $email = Crypt::decryptString($query["q"]);
            $verificationRecord = AccountVerification::where("key", $query["q"])->first();
            if(!$verificationRecord)
                throw new DecryptException("The verification key was already used before or either it is not existed yet. Be sure to properly issue an email verification in your profile.");
            $account = $verificationRecord->account;
            if($account->email !== $email)
                throw new DecryptException("Email address is no longer used. Please issue a new email verification in your profile.");

        }catch(DecryptException $e){
            return view("verification.failed-verification-email")->with("message", $e->getMessage());
        }

        //Update emailVerifiedAt since it is now verified
        $account->emailVerifiedAt = Carbon::now();
        $account->save();

        //Remove the verification record so no one can recycle it
        $verificationRecord->delete();

        return view("verification.success-verification-email");
    }
}
