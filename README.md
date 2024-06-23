# Academic Digital Library Application: Express Backend
This is the REST API of an academic digital library search interface built with node.js and typescript. This API is consumed by an Angular app.

##Features

- Written in **Typescript** for typed DB models, controllers, services and other source files.

- **JWT Authentication** with access and refresh tokens. Here is the auth workflow:
    - Client initiates login. Access and refresh token is created. A refresh token is saved to DB and then both tokens are returned
    - Client sends access token with the header for subsequent requests
    - This access token is verified by the auth-middleware for each protected route
    - Client receives 401 if the access token expires and requests for a new access token with the refresh token
    - After receiving the refresh-token it is verified and also assessed with the DB token
    - If the refresh token is valid new set pair of access and refresh tokens are generated and returned to the user
    - If the refresh token is invalid client initiates login again

- **Three-tier architecture** used for separating different layers and easy code maintainability:
    - **DB Layer**: Database logics are written in repository files for each DB model
    - **Business Layer**: Business logics are written in service files
    - **Presentation Layer**: Joi Input validation, Error handling, Proper custom HTTP response creation is done in routing and controller files

 Route -> Controller -> Service -> Repository

- Best practices for **RESTful API** implemented:
    - Correct usage of HTTP methods (GET, POST, PUT, DELETE, PATCH, etc)
    - Using plural nouns for segmenting routes
    - Proper HTTP status code and consistent response messages are used to explain different types of errors and API response
    
- **Error Handling**:
    - Async errors are handled by a wrapper middleware function which is called with each controller function.
    - Synchronous errors are handled by another middleware which converts the thrown errors into custom error responses based on types of the errors 
    - Through the app, custom errors are thrown so that they can be properly processed by the synchronous error handler middleware
    
- **JOI Validation**
    - JOI validation schemas are written for validating incoming requests
    
- **Hot Reloading**
    - Nodemon is used in the development mode for hot reloading.

##Prerequisites

- Node.js (version v18.20.2 or higher)
- npm (Node Package Manager)

##Installation
1. Clone repo: `$ git clone git@bitbucket.org:romy6047/uregina-baseline-api.git`

2. Install: `$ npm install`

3. Create environment variable files for development and production inside the environment directory. Use the '.env.example' as the example.
4. Start app (dev): `$ npm start ` (prod): `$ npm prod-start`

##Todo
- Logging user interaction and errors with winston and morgan
- Provide a Swagger endpoint for API documentation