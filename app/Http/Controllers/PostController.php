<?php

namespace App\Http\Controllers;

use App\Http\Requests\StorePostRequest;
use App\Models\Post;
use Illuminate\Support\Facades\Log;
class PostController extends Controller
{
    
     /**
     * PostController constructor;
     */

    protected $apiService;
    public function __construct(ApiService $apiService)
    {
        $this->apiService = $apiService;
    }


    /**
     * Display a listing of the resource.
    */

    public function index()
    {
        // Fetch all posts with selected fields
        $apiResponse = $this->apiService->fetchPosts();
        // Fetch all posts with selected fields
        $posts = Post::select('id', 'text', 'greeting', 'image_path')->get();

        // Return the API response and the posts
        return response()->json([ 'apiResponse' => $apiResponse, 'posts' => $posts], 200);
    }
   
    /**
     * Store a newly created resource in storage.
     */
    public function store(StorePostRequest $request, Post $post)
    {
        // Initialize the file path
        $filePath = null;

        // Log the request data
        Log::info('Request data', $request->all());

        // Handle the file upload
        if ($request->hasFile('file')) {
            try {
                // Store the uploaded file on the FTP server and get the file path
                $filePath = $request->file('file')->store('uploads', 'ftp');
                
                // Log the file path or any errors
                if ($filePath) {
                    Log::info('File uploaded successfully', ['filePath' => $filePath]);
                } else {
                    Log::error('File upload failed: No file path returned');
                }
            } catch (\Exception $e) {
                Log::error('File upload failed: ' . $e->getMessage());
            }
        } else {
            // Log that no file was uploaded
            Log::info('No file uploaded');
        }

        // Create a new post with the request data and the file path
        $post->fill([
            'text' => $request->text,
            'greeting' => $request->greeting,
            'image_path' => $filePath,
        ])->save();

        // Return the request data for debugging
        return response()->json(['message' => 'Post created successfully', 'data' => $request->all()], 201);
    }

}