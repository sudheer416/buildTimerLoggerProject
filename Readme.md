### Project Information
- **Name**: Build  your own  timer Challenger
- **Email**: gantisudheer416@gmail.com
- **Repository URL**: 
- **Deployed Application URL**: [Your Deployed Application URL]

## Implementation Details

# Backend Implementation

## Project Structure
backend/ 
├── config/
     │ └── db.js

├── controllers/ 
│   └── timerController.js

├── middleware/ │
    └── errorHandler.js
 ├── models/ 
    │ └── Timer.js
├── routes/ 
    │ └── timerRoutes.js
├── utils/
     │ └── customError.js
     │ └── getForkTime.js  
├── .env 
├── index.js
├── package.json
└── README.md



## Installation
1. Clone the repository:
    ```sh
    git clone https://github.com/yourusername/yourrepository.git
    ```
2. Navigate to the project directory:
    ```sh
    cd yourrepository/backend
    ```
3. Install the dependencies:
    ```sh
    npm install
    ```

## Environment Variables
Create a `.env` file in the root directory and add the following environment variables:

MONGODB_URI=mongodb://localhost:27017/timer
NODE_ENV=development



## API Endpoints
### Start Timer
- **URL**: `/api/timer/start`
- **Method**: `POST`
- **Description**: Starts a new timer if the repository is not already present.
- **Request Body**:
    ```json
    {
        "owner": "repository_owner",
        "repo": "repository_name",
        "username": "github_username",
        "accessToken": "github_access_token"
    }
    ```
- **Response**:
    ```json
    {
        "repo_name": "repository_name",
        "assessment_start_time": "start_time"
    }
    ```

### Complete Timer
- **URL**: `/api/timer/complete`
- **Method**: `POST`
- **Description**: Completes the most recent timer.
- **Response**:
    ```json
    {
        "repo_name": "repository_name",
        "assessment_start_time": "start_time",
        "assessment_end_time": "end_time"
    }
    ```

### Get Timer Status
- **URL**: `/api/timer/status`
- **Method**: `GET`
- **Description**: Retrieves the status of the most recent timer.
- **Response**:
    ```json
    {
        "repo_name": "repository_name",
        "assessment_start_time": "start_time",
        "assessment_end_time": "end_time"
    }
    ```

## Error Handling

### Overview
Error handling in this project is managed using a custom error class called `AppError`. This approach allows for consistent and structured error responses throughout the application.

### Custom Error Class: AppError
The `AppError` class extends the built-in `Error` class and includes additional properties for the status code and operational status of the error. This allows for more detailed and structured error information.

### Error Handling Middleware
A dedicated middleware function captures all errors thrown in the application. It sends a structured JSON response to the client, including the error message and status code.



### Consistent Error Responses
By using the `AppError` class, the application ensures that all errors are handled consistently. This makes it easier to debug and understand errors when they occur.

### Operational vs. Programming Errors
The `AppError` class helps differentiate between operational errors  as called development (e.g., invalid user input) and programming errors (e.g., bugs in the code). This distinction is useful for determining how to handle different types of errors.

### Integration in Controllers
In the controllers, the `AppError` class is used to throw errors with specific status codes and messages. These errors are then caught by the error handling middleware, ensuring a consistent error handling flow throughout the application.


## Unit Testing

### Overview
Unit testing is a crucial part of the development process. It involves testing individual units or components of the application to ensure they work as expected. In this project, we use Jest as the testing framework.

### Mocking Dependencies
To isolate the unit being tested, we mock dependencies such as external modules and database models. This ensures that the tests are focused on the functionality of the unit itself.

### Test Setup
Each test is set up with the necessary mock data and configurations. This includes initializing request and response objects, as well as any other required setup.

### Test Cases
We write test cases to cover various scenarios, including:
- **Successful Execution**: Verifying that the function works correctly under normal conditions.
- **Error Handling**: Ensuring that the function handles errors gracefully and returns appropriate error messages.
- **Edge Cases**: Testing the function with edge cases to ensure robustness.

### Running Tests
To run the tests, use the following command:

npm test

# FrontEnd
## Timer Component Documentation

### Overview
The `Timer` component is a React-based timer that allows users to track the start and completion of an event. It interacts with a backend server to fetch and update the status of the timer, including start time, end time, and elapsed duration.

### Features
1. **Dynamic Timer**: Displays the start time, end time, and elapsed time dynamically.
2. **Server Integration**:
   - Fetches the initial status of the timer from the backend.
   - Updates the backend when the timer starts or completes.
3. **Auto-Refresh**: Updates the elapsed time every second while the timer is running.
4. **Conditional Buttons**:
   - "Start" button is disabled once the timer starts.
   - "Complete" button is enabled only after the timer starts and disabled once the timer completes.
5. **Formatted Time Display**: Shows time in a user-friendly `YYYY-MM-DD HH:MM:SS` format.




### Tech Stack Used
- Frontend: React
- Backend: Node ,Express
- Database:MongoDB
- Deployment Platform:


### Time Taken
- Start Time (Fork Time):
- End Time:
- Total Duration:


### Database Schema

### Fields
repo_name: The name of the repository associated with the timer. It is a string and is required.

assessment_start_time: The start time of the assessment. It is stored as a date and is required.

assessment_end_time: The end time of the assessment. It is stored as a date and can be null if the assessment is still ongoing.