<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Record extends Model
{
    use HasFactory;

    protected $table = 'record';
    protected $primaryKey = 'id';
    // protected $keyType = ['id','string'];
    public $incrementing = true;
    public $timestamps = true;

    //Relationships
    public function noteList(){
        return $this->belongsTo(NoteList::class);
    }
    public function account(){
        return $this->hasMany(Account::class);
    }
    public function instrument(){
        return $this->hasMany(Instrument::class);
    }
}
