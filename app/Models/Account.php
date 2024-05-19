<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Foundation\Auth\User;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class Account extends User
{
    use HasApiTokens, HasFactory, Notifiable;

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
    public function accountVerification(){
        return $this->hasMany( AccountVerification::class );
    }

}
