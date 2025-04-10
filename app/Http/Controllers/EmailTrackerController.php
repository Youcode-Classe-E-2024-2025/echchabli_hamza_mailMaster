<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Log;

class EmailTrackerController extends Controller
{
    public function trackEmail(Request $request)
    {
        
        Log::info('Email Event Data:', $request->all());
       
        $event = $request->input('event');
        $email = $request->input('email');
        
        // Handle the unique_opened event
        if ($event === 'unique_opened') {
            try {
                
                $subscriber = \App\Models\Subscriber::where('email', $email)->first();
                
                if ($subscriber) {
                    
                    $campaignSubscriber = \App\Models\CampaignSubscriber::where('subscriber_id', $subscriber->id)
                        ->where('opened', false)
                        ->first();

                        if ($campaignSubscriber) {
                            $campaignSubscriber->opened = true;
                            $campaignSubscriber->opened_at = now();
                            $campaignSubscriber->save();

                            log::info('campaignSubscriber',[$campaignSubscriber]);


                        }


                }


            }catch (\Exception $e) {
                
                log::info('Error',[$e]);
            }
                    
    
                




        log::info('Email Event Data:', $request->all());
    }

}
}