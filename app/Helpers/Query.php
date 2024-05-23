<?php
namespace App\Helpers;

use Illuminate\Http\Request;

class Query{
    protected $queries;

    public function __construct($query){ //Send the query array here
        $this->queries = $query;
    }

    public function filled(array $keys = []){
        //Make storage for new query
        $newQuery = [];
        foreach($keys as $key){
            if( !isset($this->queries[$key]) ){
                $newQuery[$key] = "";
                continue;
            }
            $newQuery[$key] = $this->queries[$key];
        }
        //Insert to this instance the new query'
        $this->queries = $newQuery;
        return $this;
    }

    public function get(){
        return $this->queries;
    }

}



