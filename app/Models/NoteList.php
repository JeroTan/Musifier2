<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class NoteList extends Model
{
    use HasFactory;

    protected $table = 'noteList';
    protected $primaryKey = 'id';
    // protected $keyType = ['id','string'];
    public $incrementing = true;
    public $timestamps = true;

    //Relationships
    public function record(){
        return $this->hasMany(Record::class);
    }

}
