<?php

namespace App\Http\Controllers\Api\V1;

use App\Helpers\QueryDatabase;
use App\HelperUtilities\TableQuery\InstrumentQuery;
use App\Http\Controllers\Controller;
use App\Models\Instrument as ModelsInstrument;
use Illuminate\Http\Request;

class Instrument extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request){
        $query = new InstrumentQuery($request->query());
        $query = $query->canSearch()->canSort()->getQueries();
        $database = new QueryDatabase(new ModelsInstrument, $query);
        $instrument = $database->doSearch()->doSort()->getDb()->get();
        return response()->json($instrument, 200);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
