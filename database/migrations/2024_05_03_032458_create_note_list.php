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
        Schema::create('note_list', function (Blueprint $table) {
            $table->id();
            $table->foreignId("recordId")->nullable()->constrained('record')->cascadeOnDelete()->cascadeOnUpdate();
            $table->string("name", 64);
            $table->string("beat", 32);
            $table->longText("stringNotes");
            $table->timestamps();

            $table->index(["recordId", "name"]);

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::disableForeignKeyConstraints();
        Schema::dropIfExists('note_list');
        Schema::enableForeignKeyConstraints();
    }
};
