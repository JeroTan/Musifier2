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
        Schema::create('record', function (Blueprint $table) {
            $table->id();
            $table->foreignId('instrumentId')->nullable()->constrained('instrument')->cascadeOnDelete()->cascadeOnUpdate();
            $table->foreignId('accountId')->nullable()->constrained('account')->cascadeOnDelete()->cascadeOnUpdate();
            $table->string('name');
            $table->longText('description')->nullable();
            $table->longText('musicName')->nullable();
            $table->longText('musicArtist')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::disableForeignKeyConstraints();
        Schema::dropIfExists('record');
        Schema::enableForeignKeyConstraints();
    }
};
