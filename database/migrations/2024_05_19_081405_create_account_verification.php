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
        Schema::create('account_verification', function (Blueprint $table) {
            $table->id();
            $table->foreignId("accountId")->constrained('account')->cascadeOnDelete()->cascadeOnUpdate();
            $table->longText("key");
            $table->longText("purpose");
            $table->timestamps();

            $table->index(["accountId"]);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::disableForeignKeyConstraints();
        Schema::dropIfExists('account_verification');
        Schema::enableForeignKeyConstraints();
    }
};
