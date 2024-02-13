# MongoDB Schema Documentation

## User Schema

### Fields

#### `name`
- **Type:** String
- **Required:** true
- **Validation:**
  - Minimum length: 3 characters
  - Maximum length: 50 characters
  - Alphabets and spaces allowed

#### `email`
- **Type:** String
- **Required:** true
- **Unique:** true
- **Validation:**
  - Standard email format

#### `password`
- **Type:** String
- **Required:** true
- **Validation:**
  - Minimum length: 8 characters
  - At least one digit, one lowercase letter, one uppercase letter, and one special character (!@#$%^&*) required

#### `role`
- **Type:** String
- **Default:** "user"

#### `address`
- **Type:** Embedded document (using the `addressSchema`)

#### `phoneNo`
- **Type:** String
- **Required:** true
- **Validation:**
  - phoneNo length is between 7 and 15 digits

### Address Schema

#### Fields

#### `address_line_1`
- **Type:** String
- **Required:** true
- **Validation:**
  - Minimum length: 3 characters
  - Maximum length: 100 characters
  - Alphanumeric characters, spaces, hyphens allowed

#### `city`
- **Type:** String
- **Required:** true
- **Validation:**
  - Minimum length: 3 characters
  - Maximum length: 30 characters

#### `state`
- **Type:** String
- **Required:** true
- **Validation:**
  - Minimum length: 3 characters
  - Maximum length: 30 characters

#### `country`
- **Type:** String
- **Required:** true
- **Validation:**
  - Minimum length: 3 characters
  - Maximum length: 30 characters

#### `pinCode`
- **Type:** Number
- **Required:** true
- **Validation:**
  - Must be a 6-digit number

### Mongoose Middleware

#### `pre("save")` Middleware
- **Purpose:** Hashes the password before saving the user data to the database.

#### `pre("findOneAndUpdate")` Middleware
- **Purpose:** Hashes the updated password before updating the user data in the database.
- **Conditions:** Runs only if the password is included in the update.

<br>
<br>

## Product Schema


### Fields

#### `productName`
- **Type:** String
- **Required:** true
- **Trimmed:** true

#### `description`
- **Type:** String
- **Required:** true

#### `price`
- **Type:** Number
- **Required:** true
- **Validation:**
  - Minimum value: 0
  - Must be a positive number

#### `image`
- **Type:** Array of objects
  - **url:**
    - **Type:** String
    - **Required:** true

#### `stock`
- **Type:** Number
- **Required:** true
- **Validation:**
  - Minimum value: 0
  - Must be a non-negative integer


#### `timestamps`
- **Purpose:** Automatically adds `createdAt` and `updatedAt` timestamps to each document.

#### Usage

To use this Product Management System, you can create, update, and retrieve product information using the provided Mongoose model.

<br>
<br>

## Order Schema

### Fields

#### `user`
- **Type:** ObjectId
- **Reference:** "user"
- **Required:** true
- **Validation:**
  - Must be a valid reference to a User document

#### `orderItems`
- **Type:** Array of objects
  - **quantity:**
    - **Type:** Number
    - **Required:** true
    - **Validation:**
      - Minimum value: 1
  - **product:**
    - **Type:** ObjectId
    - **Reference:** "product"
    - **Required:** true
    - **Validation:**
      - Must be a valid reference to a Product document

#### `orderStatus`
- **Type:** String
- **Required:** true
- **Default:** "Processing"
- **Enumeration:** ['Processing', 'Completed', 'Canceled']

#### `totalPrice`
- **Type:** Number
- **Default:** 0
- **Required:** true
- **Validation:**
  - Minimum value: 0 (non-negative)

#### `paidAt`
- **Type:** Date
- **Default:** null
- **Required:** true
- **Default:** Current date and time
- **Validation:**
  - Must be in the past or present (null is allowed)


#### `timestamps`
- **Purpose:** Automatically adds `createdAt` and `updatedAt` timestamps to each document.

### Usage

To use this Order Management System, you can create, update, and retrieve order information using the provided Mongoose model.
