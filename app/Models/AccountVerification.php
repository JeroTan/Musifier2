<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;


class AccountVerification extends Model
{
    use HasFactory;

    protected $guarded = ['id', 'created_at', 'updated_at'];

    protected $table = 'account_verification';
    //protected $primaryKey = 'id';
    // protected $keyType = ['id','string'];
    public $incrementing = true;
    public $timestamps = true;

    //Relationships
    public function account(){
        return $this->belongsTo( Account::class, "accountId" );
    }



}
