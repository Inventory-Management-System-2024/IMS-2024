# JWT Authentication Middleware

This repository contains a Node.js middleware function for authenticating incoming requests using JSON Web Tokens (JWT). The middleware verifies the presence and validity of JWT tokens provided in the request headers to secure routes and endpoints within a Node.js application.

## Installation

```bash
npm install jsonwebtoken dotenv
```

## Configuration

```env
SECRET_KEY=your_secret_key_here
```

## implementation

### Import the middleware into file

```node
import authenticate from "./authenticate.js";
```

### Apply the middleware to the routes or endpoints that require authentication

```node
router.get("/protected-route", authenticate, (req, res) => {
  // Route logic for authenticated users
});
```

## Functionality

The middleware function (authenticate) extracts the JWT token from the request headers and verifies its authenticity using the provided secret key.

If the token is valid, it attaches the decoded user information to the request object (req.user).

If the token is missing or invalid, appropriate error responses are sent back.
