<?php

namespace App\Services;

use App\Models\Campaign;
use App\Models\CampaignSubscriber;
use App\Models\Subscriber;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Validator;

class CampaignSubscriberService
{
    public function subscribeintoC($request)
    {

        // return $request;
        
        $campaign = Campaign::where('id', $request['campaign_id'])->first();

        $newsletter = $campaign->newsletter;
        // return $newsletter->template;

        foreach ($request['subscribers'] as $subscriberData) {
            $subscriber = Subscriber::find($subscriberData['id']);

            $existing = CampaignSubscriber::where('campaign_id', $campaign->id)
                ->where('subscriber_id', $subscriber->id)
                ->first();

            // if (!$existing) {
                CampaignSubscriber::create([
                    'campaign_id' => $campaign->id,
                    'subscriber_id' => $subscriber->id,
                    'opened' => false,
                ]);
              
                // Mail::send('discount', [
                //     'discount' => '50%',
                //     'productName' => 'ker',
                //     'description' => 'lzkjefz',
                //     'link' => 'https://yourstore.com/products/magic-keyboard-x'
                // ], function ($message) use ($subscriber) {
                //     $message->to('achrafsikal@gmail.com')->subject('🚀 jzhez');
                // });
                // return response()->json(['message' => 'qlllllllllller']);
               
               return $this->sendEmail(['campaignId'=>$request['campaign_id'] ,'id'=> $subscriberData['id'],'email'=>$subscriber->email , 'name' => $subscriber->name,'subject'=>$campaign->subject  ,'template' => $newsletter->template , 'description' => $newsletter->content ,'discount' => '60' ]);
               
            // }else {
            //     return response()->json(['message' => 'Subscriber already exists in the campaign.']);
            // }
        }

        return response()->json(['message' => 'Subscribers processed and emails sent.']);
    }

    private function sendEmail(array $data)
    {

        Mail::send($data['template'], [
            'userId'=>$data['id'] ?? 0,
            'campaignId'=>$data['campaignId'] ?? 0,
            'discount' => $data['discount'] ?? 'opi',
            'productName' => $data['name'] ?? 'test',
            'description' => $data['description'] ?? '',
            'link' => 'https://yourstore.com/products/magic-keyboard-x'
        ], function ($message) use ($data) {
            $message->to($data['email'])
                    ->subject('🚀 ' . ($data['subject'] ?? 'Special Discount!'));
        });
    }
    

    
}
