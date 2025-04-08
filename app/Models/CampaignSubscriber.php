<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CampaignSubscriber extends Model
{
    protected $table = 'campaign_subscriber';  // Define the custom table name
   
    protected $fillable = ['campaign_id', 'subscriber_id', 'opened'];
}
