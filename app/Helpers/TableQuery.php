<?php
namespace App\Helpers;

class TableQuery{
    protected $rawQueries = [];
    protected $allowedColumnsToMatch =[];
    protected $allowedColumnsToMultiMatch = [];
    protected $allowedColumnsToSort = [];
    protected $allowedColumnsToSearch = [];
    protected $matchConverter = [
        "eq"=>"=",
        "neq"=>"!=",
        "gt"=>">",
        "lt"=>"<",
        "gte"=>">=",
        "lte"=>"<=",
    ];
    protected $multiMatchConverter = [
        "in",
        "notIn",
    ];
    /**
     * Special Query
     * 1. multiMatcher
     * 2. search
     * 3. sort
     */
    protected $modQuery = [
        "matcher"=>[], //result in array of ["column", "matchType", "value"]
        // This will only added if there is such thing as this one;
        // "multiMatcher=>[],
        // "search"=>"",
        // "sort"=>[], //Columns in order with sort type

    ];

    public function __construct($query){
        $this->rawQueries = $query;
    }

    //** YOU MAY OVERLOAD THIS FUNCTIONS USING THEIR PROTECTED VERSION */
    public function columnsToAllowInMatch($columns = []){
        $this->allowedColumnsToMatch = $columns;
        return $this;
    }
    public function columnsToAllowInSort($columns = []){
        $this->allowedColumnsToSort = $columns;
        return $this;
    }
    public function columnsToAllowInMultiMatch($columns = []){
        $this->allowedColumnsToMultiMatch = $columns;
        return $this;
    }
    public function columnsToAllowInSearch($columns = []){
        $this->allowedColumnsToSearch = $columns;
        return $this;
    }
    //** YOU MAY OVERLOAD THIS FUNCTIONS USING THEIR PROTECTED VERSION */

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

    public function canSearch($filled = true){//filled means to add empty value if not exist
        if($filled)
            $this->modQuery["search"] = ["value"=>"","columns"=>$this->allowedColumnsToSearch];

        if( isset($this->rawQueries["search"]) ){
            $this->modQuery["search"] = ["value"=>$this->rawQueries["search"], "columns"=>$this->allowedColumnsToSearch];
        }

        return $this;
    }

    public function canSort(){
        if( !(isset($this->rawQueries["sortOrder"]) && isset($this->rawQueries["sortType"])) )//check If sortOrder and sortType exist in query
            return $this;

        $rawSortOrder = $this->rawQueries["sortOrder"]; //make a copy from the queries;
        $rawSortType = $this->rawQueries["sortType"];

        //Now check if they are in array and has the same item count;
        if( !(is_array($rawSortOrder) && is_array($rawSortType) && count($rawSortOrder) === count($rawSortType)) )
            return $this;

        $sortColumnCopy = [];
        foreach($this->allowedColumnsToSort as $column){//No copy only the column that is allowed in sorting
            $order = array_search($column, $rawSortOrder);
            if(!$order)
                continue;

            $sortColumnCopy[$order] = $column;
        }
        ksort($sortColumnCopy);//Since Raw sort order have sorting then sort them in order
        $cleansedSortOrder = array_filter($sortColumnCopy, fn()=>true); //This will refresh the indexing to an actual array

        $FinalSort = [];
        foreach($cleansedSortOrder as $column){
            if( !(isset($rawSortType[$column]) && ( $rawSortType[$column] == "ASC" || $rawSortType[$column] == "DESC" )) ){
                $FinalSort[$column] = "ASC";
                continue;
            }

            $FinalSort[$column] = $rawSortType[$column];
        }

        if(count($FinalSort))
            $this->modQuery["sort"] = $FinalSort;

        return $this;
    }

    public function canMultiMatch(){
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

    public function getQueries(){
        return $this->modQuery;
    }

}
