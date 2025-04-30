<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class HomepageController extends Controller
{
    public function prepareHomepage(Request $request)
    {
        return Inertia::render('app', [
            'isFileReady' => false
        ]);
    }
}
