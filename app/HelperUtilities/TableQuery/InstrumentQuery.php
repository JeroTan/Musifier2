<?php
namespace App\HelperUtilities\TableQuery;

use App\Helpers\TableQuery;

class InstrumentQuery extends TableQuery{
    protected $allowedColumnsToSort = [
        "name",
        "description",
    ];
    protected $allowedColumnsToSearch = [
        "name",
        "description",
    ];
}
