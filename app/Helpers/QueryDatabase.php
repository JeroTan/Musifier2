<?php
namespace App\Helpers;

use Illuminate\Support\Facades\DB;

//This mostly work on Laravel
class QueryDatabase{

    public function __construct( protected $db, protected $query=false){//$query must contains either matcher, multiMatcher, sort, search
    }

    public function addDb($db){
        $this->db = $db;
        return $this;
    }
    public function addQuery($query){
        $this->query = $query;
        return $this;
    }

    public function doMatch(){
        if(isset($this->query["matcher"]) && count($this->query["matcher"]) > 0 ){
            $this->db = $this->db->where($this->query["matcher"]);
        }
        return $this;
    }

    public function doMultiMatch(){
        if( !(isset($this->query["multiMatcher"]) && count($this->query["matcher"]) > 0) )
            return $this;

        foreach($this->query["multiMatcher"] as $val){

            switch($val[1]){
                case "in":
                    $this->db = $this->db->whereIn($val);
                break;
                case "notIn":
                    $this->db = $this->db->whereNotIn($val);
                break;
            }

        }

        return $this;
    }

    public function doSearch(){
        if( !(isset($this->query["search"]) && isset($this->query["search"]["value"]) && isset($this->query["search"]["columns"])) )
            return $this;
        if( !(count($this->query["search"]["columns"]) > 0 && $this->query["search"]["value"] !== "") )
            return $this;

        $value = $this->query["search"]["value"];
        $columns = $this->query["search"]["columns"];
        $this->db = $this->db->where( function($query) use($value, $columns){
            foreach( $columns as $key => $column  ){
                $query = $query->orWhere($column, "like", "%".$value."%");
            }
        });
        return $this;
    }
    public function doSort(){
        if( !(isset($this->query["sort"]) && count($this->query["sort"]) > 0) )
            return $this;

        foreach($this->query["sort"] as $column => $type){
            $this->db = $this->db->orderBy($column, $type);
        }

        return $this;
    }
    public function getDb(){
        return $this->db;
    }
}
