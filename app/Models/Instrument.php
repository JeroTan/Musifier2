<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Instrument extends Model
{
    use HasFactory;

    protected $table = 'instrument';
    protected $primaryKey = 'id';
    // protected $keyType = ['id','string'];
    public $incrementing = true;
    public $timestamps = true;

    //Relationships
    public function record(){
        return $this->belongsTo(Record::class);
    }
}
