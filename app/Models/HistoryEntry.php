<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class HistoryEntry extends Model
{
    protected $fillable = ['email', 'link', 'videoname', 'format'];
    protected function casts()
    {
        return [
            'created_at' => 'datetime:Y-m-d H:i:s',
        ];
    }
}
