<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\Http;
class ApiService extends Controller
{
    protected $baseUrl;
    
    public function __construct()
    {
        // Set the base URL for the API using the value from the environment variable 'CAT_FACT_API_URL'
        $this->baseUrl = env('CAT_FACT_API_URL');
    }

    public function fetchPosts()
    {
        try {
            // Send a GET request to the API to fetch a random cat fact
            $response = Http::get("{$this->baseUrl}/facts/random?amount=1");
    
            // Return the response as JSON
            return $response->json();
        } catch (\Exception $e) {
            return [];
        }
    }
    
   
}
