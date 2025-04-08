<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

use Illuminate\Database\Eloquent\Factories\HasFactory;

class Newsletter extends Model
{
    use HasFactory;

    protected $fillable = ['title', 'content', 'user_id' ,'template'];

    public function campaigns()
    {
        return $this->hasMany(Campaign::class);
    }
}
