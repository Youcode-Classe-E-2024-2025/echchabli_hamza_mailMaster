<?php
namespace App\Http\Controllers;

use App\Models\Newsletter;
use Illuminate\Http\Request;

class NewsletterController extends Controller
{
    public function create(Request $request)
    {
        $request->validate([
            'title' => 'required|string|unique:newsletters,title',
            'content' => 'required|string',
            'user_id' => 'required|exists:users,id',
        ]);

        $newsletter = Newsletter::create([
            'title' => $request->title,
            'content' => $request->content,
            'user_id' => $request->user_id,
        ]);

        return response()->json($newsletter, 201);
    }

    public function getAll()
    {
        return response()->json(Newsletter::all());
    }

    public function getByTitle($title)
    {
        $newsletter = Newsletter::where('title', $title)->first();

        if (!$newsletter) {
            return response()->json(['message' => 'Newsletter not found'], 404);
        }

        return response()->json($newsletter);
    }
}
