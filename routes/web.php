<?php

use App\Mail\V1\WelcomeVerifyEmail;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/


//View Email
Route::get('/test/mail', function(){

    return "DONE!";
});


/* For Single Page Application */
/**
 * For Single React App
 * Since it will return the same view, a helper function will shorten the code below while chaining will still be possible
 */
function req(string $type, string $uri){
    return Route::$type($uri, function(){
        return view('index');
    });
}

//Homepage
req("get", "/");

//Authentication
req("get", "/signup");
req("get", "/login");

//Instruments



//Learn
