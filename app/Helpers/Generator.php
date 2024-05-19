<?php
namespace App\Helpers;


class Generator{
    public static function vignere($data, $key, $encrypting = true){
        $dataLength = strlen($data);
        $keyLength = strlen($key);

        if($dataLength < $keyLength)
            $key = substr($key, 0, $dataLength);
        elseif($keyLength < $dataLength)
        {
            $key = floor($dataLength / $keyLength) < 2?$key.substr($key, 0, $dataLength - $keyLength):str_repeat($key, floor($dataLength / $keyLength)).substr($key, 0, $dataLength % $keyLength);
        }
        $keyLength = strlen($key);

        $streamReference = 'AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz0123456789'; //REFACTOR THIS ONE FOR SPECIAL CHARACTERS LIKE PASSWORDS
        $modifiedData = '';
        for($i = 0; $i < $keyLength; $i++){
            if($encrypting == true)
                $modifiedData .= $streamReference[ (strpos($streamReference, $key[$i]) + strpos($streamReference, $data[$i])) % strlen($streamReference) ];
            else
                $modifiedData .= $streamReference[ ($position = strpos($streamReference, $data[$i]) - strpos($streamReference, $key[$i]))< 0?strlen($streamReference)+$position:$position ];

        }
        return $modifiedData;
    }

    public static function id($moreSalt="", $idLength = 6, $extended = false){
        date_default_timezone_set("Asia/Manila");
        $Year = date("Y");
        $Day = substr(date('z')+1000, 1, 3); //Total Day elapse in a year instead of per month
        $Hour = date('H');

        $Salt1 = substr(uniqid(), rand(0, 10), 3);
        $Salt2 = substr(uniqid(), 8, 5);
        $Salt3 = chr(rand(97, 122)).chr(rand(97, 122)).chr(rand(97, 122));
        $Salt4 = $extended? uniqid() : '';

        $uniqueID = $Hour.$Salt1.$Year.$Salt2.$Day.$Salt3.$Salt4;
        $uniqueID = substr(strrev($uniqueID), 0, $idLength);

        $uniqueID = $uniqueID.Generator::vignere( substr($moreSalt, 0, $idLength), $uniqueID, true );
        return $uniqueID;
    }
}

