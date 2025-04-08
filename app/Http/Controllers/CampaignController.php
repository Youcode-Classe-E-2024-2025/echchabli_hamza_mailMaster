<?php 
namespace App\Http\Controllers;

use App\Models\Campaign;
use App\Models\CampaignSubscriber;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class CampaignController extends Controller
{
    // Create a new campaign
    public function create(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'subject' => 'required|string|max:255',
            'user_id' => 'required|exists:users,id',
            'newsletter_id' => 'required|exists:newsletters,id',
            'start_at' => 'nullable|date',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $campaign = Campaign::create([
            'subject' => $request->subject,
            'user_id' => $request->user_id,
            'newsletter_id' => $request->newsletter_id,
            'start_at' => $request->start_at,
        ]);

        return response()->json($campaign, 201);
    }

    // Get all campaigns
    public function getAll()
    {
        return response()->json(Campaign::with('user', 'newsletter')->get());
    }

    // Update campaign status
    public function updateStatus($id, Request $request)
    {
        $request->validate([
            'status' => 'required|in:ongoing,end'
        ]);

        $campaign = Campaign::findOrFail($id);
        $campaign->status = $request->status;
        $campaign->save();

        return response()->json(['message' => 'Status updated.', 'campaign' => $campaign]);
    }

    // Check if a subscriber opened the email
    public function getCampaignSubscriber($campaignId, $subscriberId)
    {
        $cs = CampaignSubscriber::where('campaign_id', $campaignId)
                ->where('subscriber_id', $subscriberId)
                ->first();

        if (!$cs) {
            return response()->json(['message' => 'No such subscription.'], 404);
        }

        return response()->json([
            'campaign_id' => $cs->campaign_id,
            'subscriber_id' => $cs->subscriber_id,
            'opened' => $cs->opened,
        ]);
    }
}
