<?php

namespace App\Http\Controllers;

use App\Models\Subscriber;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;

class SubscriptionController extends Controller
{
    public function addSub(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email|unique:subscribers,email',
            'name' => 'required|string'
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $subscriber = Subscriber::create([
            'email' => $request->email,
            'name' => $request->name,
            'active' => true,
        ]);

        return response()->json(['message' => 'Subscribed successfully', 'data' => $subscriber], 201);
    }

    public function cancelSub(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email|exists:subscribers,email',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $subscriber = Subscriber::where('email', $request->email)->first();
        $subscriber->active = false;
        $subscriber->save();

        return response()->json(['message' => 'Unsubscribed successfully']);
    }

    public function getAllSub()
    {
        $subscribers = Subscriber::all();
        return response()->json($subscribers);
    }

    public function filterBy(Request $request)
    {
        $query = DB::table('subscribers');

        if ($request->has('start_date') && $request->has('end_date')) {
            $query->whereBetween('created_at', [$request->start_date, $request->end_date]);
        }

        if ($request->has('limit')) {
            $query->limit($request->limit);
        }

        $subscribers = $query->get();

        return response()->json($subscribers);
    }
}
