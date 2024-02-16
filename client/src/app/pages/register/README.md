# Register Component Documentation

## Overview

The Register Component in Angular is responsible for handling user registration. It provides a form for users to input their name, email, phone number, password, and confirm password. Real-time validation feedback is provided for each input, and the registration request is sent to the backend via the RegisterService.

## Properties

- **`showPassword`**: A boolean property to toggle the visibility of the password.
- **`showConfirmPassword`**: A boolean property to toggle the visibility of the confirm password.
- **`errMsg`**: Holds error messages related to the registration process.

## Methods

- **`login()`:** Navigates to the login page.
- **`togglePassword()`:** Toggles the visibility of the password.
- **`toggleConfirmPassword()`:** Toggles the visibility of the confirm password.
- **`postUser(user: User)`:**
  - Handles user registration.
  - Validates user input for name, email, phone number, password, and confirm password.
  - Uses **`RegisterService`** to send the registration request to the backend.
  - Displays success or warning messages using **`ToastrService`**.

## Form Group

**`registerForm`:** A FormGroup that contains form controls for name, email, phone number, password, and confirm password. It utilizes Angular's reactive forms.

## Form Controls

name, email, phoneNo, password, and cpw (confirm password): Form controls with specified validators for input validation.

## Password Matching Validator

A custom validator (passwordMatchValidator) is implemented to ensure that the password and confirm password fields match.

## Dependencies

- Angular Forms and ReactiveFormsModule for managing form-related functionality.
- **`RegisterService`**: Service for handling user registration.
- **`ToastrService`**: Library for displaying toast notifications.
