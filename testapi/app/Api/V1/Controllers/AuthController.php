<?php

namespace App\Api\V1\Controllers;
use Validator;
use Config;
use DB;
use App\User;
use App\TblEmployee;
use Illuminate\Http\Request;
use Illuminate\Mail\Message;
use Dingo\Api\Routing\Helpers;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Password;
use Dingo\Api\Exception\ValidationHttpException;
use Cartalyst\Stripe\Stripe;
use Illuminate\Support\Facades\Auth;
use GuzzleHttp\Client;
use Hash;

class AuthController extends Controller
{
    use Helpers;
    public function __construct(Request $request){
        $collection = [];
    }
      
    
    public function index() {
        $result = collect(["status" => "1", "message" => "Welcome to Test Api"]);
        return $result;
    }
    
    public function login(Request $request){
        try {
            $validator = Validator::make($request->all(), [
                'email_id' => 'required',
                'password' => 'required',
            ]);
            //print_r('s');exit();
            if($validator->fails()) 
            { 
                return response()->json(['status' =>0, 'message' => $validator->errors()->all()]);
            }
            $result = DB::table('users')->where(array('email_id'=>$request->email_id))->get();
            if(count($result)>0){
                if (Hash::check($request->password, $result[0]->password)) {
                    return response()->json(['status' => 200, 'message' => "Login Success.",'data'=>$result[0]]);
                }else{
                    return response()->json(['status' => 201, 'message' => "Email or password incorrect.",'data'=>""]);
                }
            }else{
                return response()->json(['status' => 201, 'message' => "Login details not found.",'data'=>""]);
            }
     
            
        }catch (Exception $e){
            return response()->json(['status' =>0, 'message' => $validator->errors()->all()]);
        }
        
    }

    


    
    public function list_employee(){
        $result = TblEmployee::get();
        if($result){
            $result = collect(["status" => "1", "message" =>'Item list','data'=>$result]);
        }else{
            $result = collect(["status" => "0", "message" => \Config::get('constants.results.160')]);
        }
        return response()->json($result, 200);
    }


    



    

   



}