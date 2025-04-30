<?php

use App\Http\Controllers\DownloadController;
use App\Http\Controllers\HomepageController;
use Illuminate\Support\Facades\Route;

Route::get('/', [HomepageController::class, 'prepareHomepage']);
Route::get('/download/{hash}', [DownloadController::class, 'downloadFile']);
Route::get('/download', function () {
    return redirect('/');
});
Route::post('/download', [DownloadController::class, 'getVideo']);
