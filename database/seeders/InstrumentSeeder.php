<?php

namespace Database\Seeders;

use App\Models\Instrument;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class InstrumentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Instrument::insert([
            [
                "name"=>"Electric Guitar",
                "description"=>"Use the fret-board interface to make a notes and chords. You may also add a TAB for future reuse."
            ],
            [
                "name"=>"Piano",
                "description"=>"A basic piano interface that covers standard 88 keys. You may use this to create basic sheets."
            ],
        ]);
    }
}
