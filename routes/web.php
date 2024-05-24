<?php

use App\Helpers\Parser;
use App\Http\Controllers\Web\V1\Authenticate;
use App\Mail\V1\WelcomeVerifyEmail;
use App\Models\Instrument;
use Illuminate\Support\Facades\Auth;
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



//Verify Email
Route::get('verify_email', [Authenticate::class, "verifyEmail"]);

/* For Single Page Application */
/**
 * For Single React App
 * Since it will return the same view, a helper function will shorten the code below while chaining will still be possible
 */
function req(string $uri){
    return Route::get($uri, function(){
        return view('index');
    });
}

//Homepage
req("/")->name("homepage");


//Authentication
req("/signup");
req("/login")->name('login');
req("/join");
// req("/logout");


//Instruments
req("/instrument");
$instruments = Instrument::all();
foreach($instruments as $instrument){
    req("/instrument/".Parser::noSpaces($instrument->name));
}



//Learn



//Fallback
Route::fallback(function(){
    return redirect()->route("homepage");

});
