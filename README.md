# jwt_cookies
This repository contains a simple API for user authentication, specifically for user login and signup functionality. It provides endpoints for registering new users and allowing existing users to authenticate and obtain access to protected resources.

Installation


        Clone the repository:
                git clone https://github.com/your-username/login-signup-api.git


        Install dependencies:
                cd login-signup-api
                npm install


        Set up the environment variables:
                Create a .env file in the root directory of the project.
                Define the required environment variables, such as PORT, MONGODB_URI, and JWT_SECRET.
                npm start
                The server will start running on the specified port, and you can now send HTTP requests to the provided API endpoints.

        API Endpoints
                POST /api/signup: Register a new user. Accepts a JSON payload containing the user's name, email, and password. Returns a success message or an error if registration fails.

                POST /api/login: Authenticate a user. Accepts a JSON payload containing the user's email and password. Returns a JWT token upon successful authentication, which can be used to access protected resources.
