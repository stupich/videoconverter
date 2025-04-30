<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class DownloadController extends Controller
{
    public function getVideo(Request $request)
    {
        $link = $request->input('link');
        $format = $request->input('format');
        $filename = "";
        exec("yt-dlp -s -O \"%(title)s\" $link", $filename);
        $hash = str()->random(20);
        if ($format == "mp3" || $format == "vorbis") {
            exec("yt-dlp $link -x --audio-format $format -o storage/$hash");
        } else {
            exec("yt-dlp $link --recode-video $format -o storage/$hash");
        }
        Log::info($hash);
        session(['format' => $format, 'filename' => $filename[0]]);
        url("/download/$hash");
        return inertia('app', ['isFileReady' => true, 'hashedFilename' => $hash]);
    }

    public function downloadFile(Request $request, string $hash)
    {
        $format = $request->session()->get('format');
        $filename = $request->session()->get('filename');
        return response()->download("storage/$hash.$format", "$filename.$format");
    }
}
