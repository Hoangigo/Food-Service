Food Service Project

This project uses Docker Compose to manage the deployment of the backend and frontend services.

Prerequisites

Before running the application, make sure you have Docker and Docker Compose installed on your machine.

Docker installation guide

Docker Compose installation guide

Getting Started

Follow the steps below to build and run the application using Docker Compose:

Clone the repository:

git clone https://github.com/Hoangigo/Fwe_Final.git

Navigate to the project directory:

cd FWE

Customize environment variables:

Backend: Rename the .env.sample file in the backend directory to .env and update the necessary environment variables inside.
Frontend: Rename the .env.sample file in the frontend directory to .env and update the necessary environment variables inside.
Build the Docker images:

docker-compose build

Run the containers:

docker-compose up

Access the application:

The backend service will be available at http://localhost:3000, and the frontend service will be available at http://localhost:8000.

To stop the application, press Ctrl + C in the terminal and run the following command:

docker-compose down

Troubleshooting

If you encounter any issues during the build or run process, please refer to the Docker and Docker Compose documentation for troubleshooting or reach out for support.

To test the backend, you can perform CRUD operations on the recipe and ingredients in the Food Service Project. Here are the steps to test the backend:

Ensure that the backend service is running using Docker Compose (docker-compose up).

Use an API testing tool like Postman or cURL to send HTTP requests to the backend API endpoints. The backend API endpoints should be available at http://backend:3000/api/v1/, as specified in the backend .env file.

Use the following API endpoints to perform CRUD operations on recipes and ingredients:

Create a Recipe:

Endpoint: POST /recipes

Request body: Include the recipe details in the request body as JSON.

Example request body:
{
"name": "Recipe Name",
"description": "Recipe Description",
"pictureLink": "Recipe Image URL",
"ratings": 5,
"ingredients": [
{
"name": "Ingredient 1",
"description": "Ingredient 1 Description",
"pictureLink": "Ingredient 1 Link"
},
{
"name": "Ingredient 2",
"description": "Ingredient 2 Description",
"pictureLink": "Ingredient 2 Link"
}
],
"cookingSteps": ["Cooking Step 1", "Cooking Step 2"]
}

Retrieve a Recipe:

Endpoint: GET /recipes/:id

Replace :id with the ID of the recipe you want to retrieve.

Update a Recipe:

Endpoint: PUT /recipes/:id

Replace :id with the ID of the recipe you want to update.

Request body: Include the updated recipe details in the request body as JSON.

Delete a Recipe:

Endpoint: DELETE /recipes/:id

Replace :id with the ID of the recipe you want to delete.

Create an Ingredient:

Endpoint: POST /ingredients

Request body: Include the ingredient details in the request body as JSON.

Example request body:
{
"name": "Ingredient Name",
"description": "Ingredient Description",
"pictureLink": "Ingredient Link"
}
Retrieve an Ingredient:

Endpoint: GET /ingredients/:id

Replace :id with the ID of the ingredient you want to retrieve.

Update an Ingredient:

Endpoint: PUT /ingredients/:id

Replace :id with the ID of the ingredient you want to update.

Request body: Include the updated ingredient details in the request body as JSON.

Delete an Ingredient:

Endpoint: DELETE /ingredients/:id

Replace :id with the ID of the ingredient you want to delete.

Send requests to the respective endpoints using the API testing tool of your choice, providing the necessary request bodies and path parameters.

Verify the responses received from the backend to ensure that the CRUD operations are working correctly.

Feel free to customize the above instructions based on your specific backend API endpoints and requirements.
