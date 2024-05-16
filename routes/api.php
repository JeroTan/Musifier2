<?php

use App\Http\Controllers\Api\V1\Authentication;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::prefix('v1')->group(function(){
    //Authentication
    Route::controller(Authentication::class)->group(function(){
        Route::middleware("guestSanctum")->group(function(){
            Route::post('/login', "login");
            Route::post('/signup', "signup");
            Route::post('/signGoogle', "signWithGoogle");
            //Data Verifier
            Route::post('/signupVerify', "signupVerify");
        });
        Route::delete('/logout', "logout")->middleware("auth:sanctum");
    });







});
