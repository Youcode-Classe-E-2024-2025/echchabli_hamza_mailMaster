<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        
     Schema::create('campaigns', function (Blueprint $table) {
        $table->id();
        $table->string('subject');
        $table->foreignId('user_id')->constrained()->onDelete('cascade');
        $table->foreignId('newsletter_id')->constrained()->onDelete('cascade');
        $table->enum('status', ['ongoing' ,'end'])->default('ongoing');
         
        $table->timestamps();

    });
    
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('campaigns');
    }
};
