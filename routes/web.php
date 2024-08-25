<?php

use Illuminate\Support\Facades\Route;

use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Pages/Form');
}); //Route to the form page

Route::get('/database', function () {
    return Inertia::render('Pages/Database');
}); // Route to the database page