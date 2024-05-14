<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Laravel\Sanctum\HasApiTokens;

class Account extends Model
{
    use HasApiTokens, HasFactory;

    protected $fillable = [
        'username',
        'password',
        'googleLogin',
        'displayName',
    ];

    protected $hidden = [
        'password',
    ];

    protected $table = 'account';
    protected $primaryKey = 'id';
    // protected $keyType = ['id','string'];
    public $incrementing = true;
    public $timestamps = true;

    protected $casts = [
        'password'=>"hashed",
    ];

    //Relationships
    public function record(){
        return $this->belongsTo(Record::class);
    }

}
