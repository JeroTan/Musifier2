<?php
namespace App\HelperUtilities\TableQuery;

use App\Helpers\TableQuery;

class InstrumentQuery extends TableQuery{
    protected $allowedColumnsToSort = [
        "name",
    ];
    protected $allowedColumnsToSearch = [
        "name",
        "description",
    ];
}
