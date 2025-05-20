<?php

namespace App\Http\Controllers;

use App\Models\HistoryEntry;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class DownloadController extends Controller
{
    public function getVideo(Request $request)
    {
        $link = $request->validate(['link' => 'required|max:255|starts_with:https://www.youtube.com,http://www.youtube.com'])['link'];
        $format = $request->input('format');
        $filename = "";
        exec("yt-dlp -s -O \"%(title)s\" $link", $filename);

        $hash = str()->random(20);

        match ($format) {
            'mp4' => exec("yt-dlp $link -S res:1080,ext:mp4:m4a --recode mp4 -o storage/$hash"),
            'mkv' => exec("yt-dlp $link -S res:1080,ext:mkv:m4a --recode mkv -o storage/$hash"),
            'mp3' => exec("yt-dlp $link -x --audio-format mp3 -o storage/$hash"),
            'vorbis' => exec("yt-dlp $link -x --audio-format vorbis -o storage/$hash"),
        };
        session(['format' => $format, 'filename' => $filename[0]]);
        url("/download/$hash");
        if (Auth::check()) {
            HistoryEntry::create([
                'email' => Auth::user()->email,
                'link' => $link,
                'videoname' => $filename[0],
                'format' => $format,
            ]);
        }
        $history = HistoryEntry::where('email', Auth::user()->email)
            ->latest()
            ->get();
        return Inertia::render('app', ['isFileReady' => true, 'hashedFilename' => $hash, 'isLoggedIn' => Auth::check(), 'history' => $history]);
    }

    public function downloadFile(Request $request, string $hash)
    {
        $format = $request->session()->get('format');
        $filename = $request->session()->get('filename');
        if ($format == 'vorbis') {
            return response()->download("storage/$hash.ogg", "$filename.ogg");
        }
        return response()->download("storage/$hash.$format", "$filename.$format");
    }
}
