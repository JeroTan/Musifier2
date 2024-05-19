<?php

namespace App\Helpers;

trait structure{

};

class Parser{
    public function __construct(){

    }

    public static function noSpaces($string){
        return preg_replace('/\s+/', '', $string);
    }

}

