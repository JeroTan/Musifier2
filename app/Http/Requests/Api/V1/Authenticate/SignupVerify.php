<?php

namespace App\Http\Requests\Api\V1\Authenticate;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\Password;

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
        $rules = [
            "username" => "sometimes|required|max:32|regex:/^[a-zA-Z0-9\,\.\-\_\"\']*$/|unique:account,username",
            "email" => "sometimes|required|email:dns|unique:account,email",
            "password" => ["sometimes", "required", Password::min(8)->max(256)->letters()->numbers()],
            "confirmPassword" => "sometimes|required",
        ];
        return $rules;
    }

    public function messages(){
        return [
            "username.required" => "You forget to include your Username.",
            "useranem.max" => "Maximum Username length is 32.",
            "username.regex" => "The only accepted characters are alphanumeric, the following special characters: ,.-_\"' and contains no space.",
            "username.unique" => "The username is already taken.",
            "email.unique"=>"Email address is already used.",
            "confirmPassword.same"=>"Confirm Password does not match with your given password.",
        ];
    }
}
