<?php

use App\Http\Controllers\DownloadController;
use App\Http\Controllers\HomepageController;
use Illuminate\Support\Facades\Route;

Route::get('/', [HomepageController::class, 'prepareHomepage'])->name('app');
Route::get('/download/{hash}', [DownloadController::class, 'downloadFile']);
Route::get('/download', function () {
    return to_route('app');
});
Route::post('/download', [DownloadController::class, 'getVideo']);

require __DIR__ . '/auth.php';
