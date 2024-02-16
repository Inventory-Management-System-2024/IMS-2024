# Admin Component Documentation

## Overview

The AdminComponent is an Angular component responsible for managing and displaying user data in an administration panel. It includes functionality to retrieve and display a list of users, as well as the ability to delete individual users using the UsersService. The component also imports and uses the NavbarComponent for navigation.

## Properties

**`users:`** An array to store the list of users retrieved from the UsersService.
**`errMsg:`** Holds any error message encountered during user data retrieval.

## Methods

- **`ngOnInit():`**
  - Lifecycle hook that is called after the component is initialized.
  - Retrieves all users using the UsersService and subscribes to the observable to update the users array.
  - Handles errors by storing the error message in errMsg.
- **`deleteUser(id: number):`**
  - Deletes a user with the specified ID using the UsersService.
  - Also removes the deleted user from the users array locally.

## Dependencies

- **`NavbarComponent:`** Imported for displaying the navigation bar in the administration panel.
- **`UsersService:`** Service for retrieving and managing user data.
- **`AsyncPipe and CommonModule:`** Imported from Angular core modules for handling asynchronous operations and common functionalities.
