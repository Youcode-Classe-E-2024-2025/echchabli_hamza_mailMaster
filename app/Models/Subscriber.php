<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Subscriber extends Model
{
    use HasFactory;

    protected $fillable = ['email', 'is_active'];

    public function campaigns()
    {
        return $this->belongsToMany(Campaign::class, 'campaign_subscriber')
                    ->withTimestamps()
                    ->withPivot('opened');
    }
}
