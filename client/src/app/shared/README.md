# ◆ AuthGuard Service

### - This service is designed to protect routes in our Inventory Management System by checking the user's authentication status.
### Import and Inject
#### - import the AuthGuardService in your component or module:

### Inject the service in the constructor:
```typescript
constructor(private authGuardService: AuthGuardService) { }
```
### Implement the canActivate method in your route configuration:
```typescript
const routes: Routes = [
{
    path: 'products',
    component: ProductComponent,
    canActivate: [AuthGuardService]
  },
  // ... other routes
];
```

# ◆ Global Error Handler Service

## Overview
The Global Error Handler Service is designed to handle HTTP errors within an Angular application. It provides meaningful error messages for both client-side or network errors and errors returned by the backend.

## Features
- Handles client-side or network errors
- Captures and logs backend errors
- Generates descriptive error messages for better user understanding

## Usage
1. Import the `GlobalErrorHandlerService` into your Angular services or components.
2. Implement error handling using the `handleError` method.

# ◆ Users Service

## Description

#### - The Users Service in our Inventory Management System handles interactions with user-related data. It is basically built for admin side.

## Features
- Retrieve all users
- Retrieve a specific user by ID
- Update user information
- Delete a user

### Example: Get all users:
```typescript
userService.getAllUsers().subscribe(users => {
      console.log(users);
});
```

# ◆ Register Service

## Overview
The Register Service is responsible for handling user registration and login functionalities within an Angular application.

## Features
- Register a new user
- Authenticate user login

## Usage
1. Import the `RegisterService` into your Angular components or services.
2. Utilize the `register` method to register a new user.
3. Use the `login` method for user authentication.

# ◆ Product Service

## Overview
The Product Service is responsible for managing product-related operations within an Angular application.

## Features
- Retrieve all products
- Retrieve a specific product by name
- Add a new product
- Update product information
- Delete a product

## Usage
1. Import the `ProductService` into your Angular components or services.
2. Utilize the provided methods for product-related operations.

### Example: Add a new product
```typescript
const newProduct = { /* Product object with required details */ };
productService.addProduct(newProduct).subscribe(
  addedProduct => {
    console.log('Product added successfully:', addedProduct);
  },
  error => {
    console.error('Adding product failed:', error);
    // Handle error
  }
```

# ◆ Order Service

## Overview
The Order Service is designed to manage order-related functionalities within an Angular application.

## Features
- Retrieve all orders
- Retrieve a specific order by ID
- Add a new order
- Update order information
- Delete an order

## Usage
1. Import the `OrderService` into your Angular components or services.
2. Utilize the provided methods for order-related operations.

### Example: Delete an order
```typescript
const orderIdToDelete = 123; // Replace with the actual order ID you want to delete

orderService.deleteOrder(orderIdToDelete).subscribe(
  deletedOrder => {
    console.log('Order deleted successfully:', deletedOrder);
    // Handle deletion success
  },
  error => {
    console.error('Deleting order failed:', error);
    // Handle deletion error
  }
);
```

# ◆ Shared Data Service

## Overview
The Shared Data Service facilitates data sharing between components in an Angular application using a BehaviorSubject.

## Features
- Utilizes a BehaviorSubject for real-time data sharing
- Provides an observable (`data$`) for components to subscribe and receive updates
- Includes a `sendData` method to update the shared data

## Usage
1. Import the `SharedDataService` into your Angular components or services.
2. Subscribe to the `data$` observable to receive shared data updates.
3. Use the `sendData` method to update the shared data from a component.

# Interfaces

## Order Interface

### `OrderElement`

Represents an order with the following properties:

- `user`: User details including name and email.
- `orderItems`: An array of order items containing quantity, product details, and a unique identifier.
- `orderStatus`: The status of the order.
- `totalPrice`: The total price of the order.
- `paidAt`: The timestamp when the order was paid.

## Product Interface

The `Product` interface represents a product within the application, providing a structured format for product-related data.

### Properties

- ``productName``: The name of the product.
- ``description``: A brief description of the product.
- ``price``: The price of the product.
- ``imag``: An array of product images, each having a URL.
- ``category``: The category to which the product belongs.
- ``stock``: The available stock of the product.

## User Interface

The `User` interface represents a user within the application, providing a structured format for user-related data.

### Properties

- `name`: The name of the user.
- `email`: The email address of the user.
- `password`: The user's password.
- `role`: The role or type of the user.
- `address`: User's address details, including address line, city, state, country, and pin code.
- `phoneNo`: The phone number of the user.
- `error`: An optional property for handling errors.