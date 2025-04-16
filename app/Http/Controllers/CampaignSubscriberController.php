<?php

namespace App\Http\Controllers;


use App\Services\CampaignSubscriberService;


use App\Models\Campaign;
use App\Models\CampaignSubscriber;
use App\Models\Subscriber;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Mail;

use Illuminate\Support\Facades\Log;

class CampaignSubscriberController extends Controller
{
    protected $service;

    public function __construct(CampaignSubscriberService $service)
    {
        $this->service = $service;
    }
    
    public function subscribeToCampaign(Request $request)
    {

        log::info("input" , $request->all());
        



       
        $validator = Validator::make($request->all(), [
            'campaign_id' => 'required|exists:campaigns,id',
            'subscribers' => 'required|array',
            'subscribers.*.id' => 'required|exists:subscribers,id',
            
        ]);
        


    //  return  $validator['campaign_id'];
        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors()
            ], 400);
        }


      
   
        return $this->service->subscribeintoC($validator->validated());

    }



    public function getCampaignSubscribers($campaignId){


        $campaign = Campaign::find($campaignId);
        if (!$campaign) {
            return response()->json(['message' => 'Campaign not found'], 404);
        }
        $subscribers = $campaign->subscribers;
        return response()->json($subscribers);
        



    }






}