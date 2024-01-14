# Authenticate Assignment

Brief description of your project.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [API Documentation](#api-documentation)
- [Database Setup](#database-setup)
- [Contributing](#contributing)
- [License](#license)

## Installation

1. **Clone the repository:**

    ```bash
    git clone https://github.com/kumarnavinrai/authenticate_assignment.git
    ```

2. **Install dependencies:**

    ```bash
    cd authenticate_assignment
    npm install
    ```

3. **Configure environment variables:**

    Create a `.env` file in the root directory and add the necessary environment variables.

    Example:

    ```env
    PORT=3000
    DATABASE_URL=your_database_url
    SECRET_KEY=your_secret_key
    ```

## Usage

Start the application:

```bash
npm start

Visit http://localhost:3000 in your browser to access the application.


# Auth-Assignment API

This documentation provides details about the Auth-Assignment API. Below are the available routes along with examples for usage.

## Login

### Endpoint

POST /api/login


### Description
Authenticate a user by providing email and password.

### Example
```json
{
    "email": "aaa@aaa.com",
    "password": "12345"
}


Sign Up
Endpoint

POST /api/users

Description
Register a new user.

Example
{
    "email": "aaa@aaa.com",
    "password": "12345",
    "name": "navin"
}

Add Bus
Endpoint

POST /bus/buses


Description
Add a new bus.

Authentication
Bearer Token required.

Example

{
    "bus_no": "PB0104",
    "status": "1"
}

Add Bus Route
Endpoint

POST /busroute/busroutes


Description
Add a new bus route.

Authentication
Bearer Token required.

Example

{
    "routeStart": "lisbon",
    "routeEnd": "azuma",
    "when": "13 Jan 2024",
    "timeStart": "13:00",
    "timeEnd": "15:00",
    "busId": "1",
    "routeName": "lisbon to azuma",
    "status": "1"
}

Update Seat Status
Endpoint

PUT /seats/seatupdate/:seat_number/:route_id

Description
Update the status of a seat.

Authentication
Bearer Token required.

Example

{
    "seat_number": "1",
    "route_id": "3",
    "user_id": "8",
    "status": "close",
    "user_details": "{'name':'John Doe','email':'user@example.com','id':1}"
}

Get Users
Endpoint

GET /api/users

Description
Retrieve a list of users.

Authentication
Bearer Token required.

Get Bus Routes
Endpoint

GET /busroute/busroutes

Description
Retrieve a list of bus routes.

Authentication
Bearer Token required.

Get All Seats
Endpoint

GET /busroute/busroutes

Description
Retrieve a list of all seats.

Authentication
Bearer Token required.

Get Seats by Route ID
Endpoint

GET /seats/seats/route/:route_id


Description
Retrieve seats for a specific route.

Authentication
Bearer Token required.

View Ticket Status
Endpoint

GET /seats/seats/:id


Description
View the status of a specific ticket.

Authentication
Bearer Token required.

View Details of the Person Owning the Ticket
Endpoint

GET /seats/seats/:id


Description
View details of the person owning a specific ticket.

Authentication
Bearer Token required.

View All Closed Tickets
Endpoint

GET /seats/seats/closed/:id

Description
View all closed tickets for a specific route.

Authentication
Bearer Token required.

View All Open Tickets
Endpoint

GET /seats/seats/open/:id

Description
View all open tickets for a specific route.

Authentication
Bearer Token required.

Open All Seats of a Route
Endpoint

PUT /seats/seats/open-all/:id

Description
Open all seats for a specific route.

Authentication
Bearer Token required.

API Documentation
API documentation can be found at /api-docs or any specific route you have defined for Swagger/OpenAPI documentation.

Database Setup
Ensure that you have set up your database and configured the database URL in the .env file.

Run database migrations:

npm run migrate

Contributing
Feel free to contribute to this project. Follow the contribution guidelines for more information.

License
This project is licensed under the MIT License.


Please replace the placeholder values as mentioned earlier and add specific details as needed for your project.
