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
    Route::middleware("guestSanctum")->group(function(){
        Route::post('/login', fn()=>true);
        Route::post('/signup', fn()=>true);
        Route::post('/signupVerify', [Authentication::class, "signupVerify"]);
        Route::post('/loginGoogle', fn()=>true);
    });
    Route::delete('/login', fn()=>true)->middleware("auth:sanctum");





});