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

class TableQuery{
    protected $rawQueries = [];
    protected $allowedColumnsToMatch =[];
    protected $allowedColumnsToMultiMatch = [];
    protected $allowedColumnsToSort = [];
    protected $matchConverter = [
        "eq"=>"=",
        "neq"=>"!=",
        "gt"=>">",
        "lt"=>"<",
        "gte"=>">=",
        "lte"=>"<=",
    ];
    protected $multiMatchConverter = [
        "not",
        "notIn",
    ];
    /**
     * Special Query
     * 1. multiMatcher
     * 2. search
     * 3. sort
     */
    protected $modQuery = [
        "matcher"=>[],
        // This will only added if there is such thing as this one;
        // "multiMatcher=>[],
        // "search"=>"",
        // "sort"=>[], //Columns in order with sort type

    ];

    public function __construct($query){
        $this->rawQueries = $query;
    }

    public function columnsToAllowInMatch($columns = []){ //You may overload instead if you want
        $this->allowedColumnsToMatch = $columns;
        return $this;
    }

    public function columnsToAllowInSort($columns = []){//You may overload instead if you want
        $this->allowedColumnsToSort = $columns;
        return $this;
    }

    public function columnsToAllowInMultiMatch($columns = []){//You may overload instead if you want
        $this->allowedColumnsToMultiMatch = $columns;
        return $this;
    }

    public function filterMatcher(){
        foreach($this->allowedColumnsToMatch as $column){
            if( !isset($this->rawQueries[$column]) || !$this->rawQueries[$column] || !is_array($this->rawQueries[$column]) )
                continue;

            $givenQueryMatcher = array_keys($this->rawQueries[$column]);

            foreach($this->matchConverter as $matcher=>$convertedMatcher){
                if(!in_array($matcher, $givenQueryMatcher))
                    continue;

                $columnMatchValue = $this->rawQueries[$column][$matcher];
                array_push($this->modQuery["matcher"], [$column, $convertedMatcher, $columnMatchValue]);
            }
        }
        return $this;
    }

    public function canSearch(){
        if( isset($this->rawQueries["search"]) ){
            $this->modQuery["search"] = $this->rawQueries["search"];
        }
        return $this;
    }

    public function canSort(){
        if( !(isset($this->rawQueries["sortOrder"]) && isset($this->rawQueries["sortType"])) )
            return $this;

        $rawSortOrder = $this->rawQueries["sortOrder"];
        $rawSortType = $this->rawQueries["sortType"];

        if( !(is_array($rawSortOrder) && is_array($rawSortType) && count($rawSortOrder) === count($rawSortType)) )
            return $this;

        $sortColumnCopy = [];
        foreach($this->allowedColumnsToSort as $column){
            $order = array_search($column, $rawSortOrder);
            if(!$order)
                continue;

            $sortColumnCopy[$order] = $column;
        }
        ksort($sortColumnCopy);
        $cleansedSortOrder = array_filter($sortColumnCopy, fn()=>true);

        $FinalSort = [];
        foreach($cleansedSortOrder as $column){
            if( !isset($rawSortType[$column]) || !( $rawSortType[$column] == "ASC" || $rawSortType[$column] == "DESC" ) ){
                $modSortType[$column] = "ASC";
                continue;
            }

            $modSortType[$column] = $rawSortType[$column];
        }

        if(count($FinalSort))
            $this->modQuery["sort"] = $FinalSort;

        return $this;
    }

    public function canInAndNotIn(){
        foreach($this->allowedColumnsToMultiMatch as $column){
            if( !isset($this->rawQueries[$column]) || !$this->rawQueries[$column] || !is_array($this->rawQueries[$column]) )
                continue;

            $givenQueryMatcher = (array_keys($this->rawQueries[$column]))[0];//Get only the first matcher since we don't need all of them

            if(array_search($givenQueryMatcher, $this->multiMatchConverter) === false){
                continue;
            }

            $columnListValue = explode(",",$this->rawQueries[$column][$givenQueryMatcher]);

            array_push($this->modQuery["multiMatcher"], [$column, $givenQueryMatcher, $columnListValue]);

        }

        return $this;
    }

}
