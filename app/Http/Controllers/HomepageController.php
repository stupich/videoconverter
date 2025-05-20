<?php

namespace App\Http\Controllers;

use App\Models\HistoryEntry;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class HomepageController extends Controller
{
    public function prepareHomepage(Request $request)
    {
        if (Auth::check()) {
            $history = HistoryEntry::where('email', Auth::user()->email)
                ->latest()
                ->get();
            return $request->user()->hasVerifiedEmail()
                ? Inertia::render('app', [
                    'isLoggedIn' => true,
                    'history' => $history,
                    'presetLink' => $request->query('link', ''),
                ])
                : to_route('verification.notice');
        }
        return Inertia::render('app', ['isLoggedIn' => false]);
    }
}
