# Login Component Documentation

## Overview

LoginComponent is an Angular component responsible for user authentication and login. It includes a login form with email and password fields, as well as functionality for toggling the password visibility, navigating to the registration and password reset pages, and handling user login through the RegisterService. It utilizes the ToastrService for displaying toast notifications.

## Properties

- **`name`**: Holds the user's name.
- **`showPassword`**: Controls the visibility of the password input.
- **`errMsg`**: Holds any error message encountered during login .
- **`toast`**: Reference to the ToastrService for displaying notifications.
- **`loginForm`**: Represents the login form with email and password fields.

## Methods

- **`signUp()`:** Navigates to the registration page.
- **`togglePassword(): void`:** Toggles the visibility of the password input.
- **`resetPassword(): void`:** Navigates to the password reset page.
- **`getUser(data: any)`:**
  - Submits the login form and handles the authentication response.
  - Stores user information in localStorage and sessionStorage upon successful login.
  - Displays success or error toasts based on the authentication result.

## Computed Properties

- **`pass()`:** Returns the password FormControl for validation.
- **`user()`:** Returns the email FormControl for validation.

## Dependencies

- **`Router`**: Angular service for navigating between views.
- **`RegisterService`**: Service for user registration and authentication.
- **`ToastrService`**: Service for displaying toast notifications.
