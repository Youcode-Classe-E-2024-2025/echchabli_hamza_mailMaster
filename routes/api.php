<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\AuthController;

Route::post('register', [AuthController::class, 'register']);
Route::post('login', [AuthController::class, 'login']);
Route::middleware('auth:sanctum')->post('logout', [AuthController::class, 'logout']);


use App\Http\Controllers\SubscriptionController;

Route::post('/subscribe', [SubscriptionController::class, 'addSub']);
Route::post('/unsubscribe', [SubscriptionController::class, 'cancelSub']);
Route::get('/subscribers', [SubscriptionController::class, 'getAllSub']);
Route::post('/subscribers/filter', [SubscriptionController::class, 'filterBy']);


use App\Http\Controllers\CampaignController;

Route::prefix('campaigns')->group(function () {
    Route::post('/create', [CampaignController::class, 'create']);
    Route::get('/', [CampaignController::class, 'getAll']);
    Route::patch('/{id}/status', [CampaignController::class, 'updateStatus']);
    Route::get('/{campaignId}/subscriber/{subscriberId}', [CampaignController::class, 'getCampaignSubscriber']);
});

use App\Http\Controllers\NewsletterController;

Route::post('/newsletters/create', [NewsletterController::class, 'create']);
Route::get('/newsletters', [NewsletterController::class, 'getAll']);
Route::get('/newsletters/title/{title}', [NewsletterController::class, 'getByTitle']);


use App\Http\Controllers\CampaignSubscriberController;

Route::post('/campaigns/subscribe', [CampaignSubscriberController::class, 'subscribeToCampaign']);



