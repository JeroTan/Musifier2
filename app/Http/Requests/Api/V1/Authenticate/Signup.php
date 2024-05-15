<?php

namespace App\Http\Requests\Api\V1\Authenticate;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\Password;

class Signup extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        $rules = [
            "username" => "required|max:32|regex:/^[a-zA-Z0-9\,\.\-\_\"\'\s]*$/|unique:account,username",
            "email" => "required|email:dns|unique:account,email",
            "password" => ["required", Password::min(8)->max(256)->letters()->numbers()],
            "confirmPassword" => "required|same:password",
        ];
        return $rules;
    }

    public function messages(){
        return [
            "username.required" => "You forget to include your Username.",
            "useranem.max" => "Maximum Username length is 32.",
            "username.regex" => "The only accepted characters are alphanumeric and the following special characters: ,.-_\"'",
            "username.unique" => "The username is already taken.",
            "email.unique"=>"Email address is already used.",
            "confirmPassword.same"=>"Confirm Password does not match with your given password.",
        ];
    }

}
