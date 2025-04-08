<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;


class Campaign extends Model
{
    
    use HasFactory;

    protected $fillable = ['user_id', 'newsletter_id', 'subject', 'content'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function newsletter()
    {
        return $this->belongsTo(Newsletter::class);
    }

    public function subscribers()
    {
        return $this->belongsToMany(Subscriber::class, 'campaign_subscriber')
                    ->withTimestamps()
                    ->withPivot('opened');
    }
}
