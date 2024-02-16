# Reset-Password Component Documentation

## Overview

The ResetPasswordComponent is an Angular component designed for handling password reset functionality. It includes a form with password and confirmPassword fields, providing the user with the ability to reset their password. The component utilizes Angular's forms module for form handling and validation.

## Properties

- **`showPassword:`** Controls the visibility of the password input.
- **`showConfirmPassword:`** Controls the visibility of the confirmPassword input.

## Methods

- **`login():`** Navigates to the login page.
- **`togglePassword():`** Toggles the visibility of the password input.
- **`toggleConfirmPassword():`** Toggles the visibility of the confirmPassword input.

## Form and Validation

The component includes a resetPasswordForm, which is a FormGroup containing the following FormControls:

- **`password:`** Input for the new password with validation for length and complexity.
- **`confirmPassword:`** Input for confirming the new password with the same validation criteria.
- Additionally, the passwordMatchValidator function ensures that the password and confirmPassword fields match.

## Dependencies

- **`Router:`** Angular service for navigating between views.
- **`CommonModule:`** Provides common directives like ngIf and ngFor.
- **`FormsModule and ReactiveFormsModule:`** Angular modules for handling forms and reactive forms.
