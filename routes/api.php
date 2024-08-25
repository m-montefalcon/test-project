<?php

use App\Http\Controllers\PostController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');


Route::post('/post', [PostController::class, 'store']); //Post request to store a new post
Route::get('/get', [PostController::class, 'index']); //Get request to fetch all posts