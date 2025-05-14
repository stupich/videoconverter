<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class HomepageController extends Controller
{
    public function prepareHomepage(Request $request)
    {
        $isLoggedIn = false;
        if (Auth::user() != null) {
            $isLoggedIn = true;
            return $request->user()->hasVerifiedEmail()
                ? Inertia::render('app', ['isLoggedIn' => $isLoggedIn])
                : to_route('verification.notice');
        }
        return Inertia::render('app', ['isLoggedIn' => $isLoggedIn]);
    }
}
