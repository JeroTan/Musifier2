<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Foundation\Auth\User;
use Laravel\Sanctum\HasApiTokens;

class Account extends User
{
    use HasApiTokens, HasFactory;

    protected $fillable = [
        'username',
        'password',
        'email',
        'emailVerifiedAt',
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
        'emailVerifiedAt'=>"datetime",
    ];

    //Relationships
    public function record(){
        return $this->belongsTo(Record::class);
    }

}
