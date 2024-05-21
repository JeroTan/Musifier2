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
        Schema::create('account', function (Blueprint $table) {
            $table->id();
            $table->string('username', 32)->unique();
            $table->string('password', 512);
            $table->string('email')->unique();
            $table->dateTime('emailVerifiedAt')->nullable();
            $table->string('displayName', 32)->nullable();
            $table->string('picture')->nullable();
            $table->timestamps();


        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::disableForeignKeyConstraints();
        Schema::dropIfExists('account');
        Schema::enableForeignKeyConstraints();
    }
};
