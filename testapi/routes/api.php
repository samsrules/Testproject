<?php

$api = app('Dingo\Api\Routing\Router');
//print_r($api->version());exit();

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

/*Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});*/

$api->version('v1', function ($api) {
    $api->post('auth/login', 'App\Api\V1\Controllers\AuthController@login');
    $api->get('auth/listemployee', 'App\Api\V1\Controllers\AuthController@list_employee');
    
});



