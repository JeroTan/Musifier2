<?php

namespace App\Http\Requests\Api\V1\Authenticate;

use Illuminate\Foundation\Http\FormRequest;

class SignupVerify extends FormRequest
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
        return [
            "username" => "sometimes|required|max:32|regex:/^[a-zA-Z0-9\,\.\-\_\"\'\s]*$/|unique:account,username",
            "email" => "sometimes|required|email:dns|unique:account,email",
            "password" => "sometimes|required|min:8|max:256",
            "confirmPassword" => "sometimes|required|same:password",
        ];
    }

    public function messages(){
        return [
            "username.required" => "You forget to include your Username.",
            "useranem.max" => "Maximum Username length is 32.",
            "username.regex" => "The only accepted characters are alphanumeric and the following special characters: ,.-_\"'",
            "username.unique" => "The username is already taken.",
            "email.required" => "Email address is required.",
            "email.unique"=>"Email address is already used.",
            "password.min"=>"Password should be 8 characters long.",
            "password.max"=>"Password max character limit reached.",
            "confirmPassword.same"=>"Confirm Password does not match with your given password.",
        ];
    }
}
