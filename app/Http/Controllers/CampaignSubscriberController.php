<?php

namespace App\Http\Controllers;

use App\Models\Campaign;
use App\Models\CampaignSubscriber;
use App\Models\Subscriber;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Mail;

class CampaignSubscriberController extends Controller
{
    // Associate a subscriber with a campaign
    public function subscribeToCampaign(Request $request)
    {
        


        $validator = Validator::make($request->all(), [
            'campaign_id' => 'required|exists:campaigns,id',
            'subscriber_id' => 'required|exists:subscribers,id',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors()
            ], 400);
        }


        $campaign = Campaign::with('newsletter')->find($request->campaign_id);
        $subscriber = Subscriber::find($request->subscriber_id);
        $newsletter = $campaign->newsletter;

       

   
        $existing = CampaignSubscriber::where('campaign_id', $request->campaign_id)->where('subscriber_id', $request->subscriber_id)->first();
        
        if ($existing) {
            return response()->json([
                'message' => 'Subscriber is already subscribed to this campaign.'
            ], 400);
        }

      
        $campaignSubscriber = CampaignSubscriber::create([
            'campaign_id' => $request->campaign_id,
            'subscriber_id' => $request->subscriber_id,
            'opened' => false,  
        ]);

        return response()->json([
            'message' => 'Subscriber successfully added to the campaign.',
            'campaign_subscriber' => $campaignSubscriber
        ], 201);
    }







}