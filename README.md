# Storefront Backend Project

## Getting Started

This repo contains a basic Node and Express app to get you started in constructing an API. To get started, clone this repo and run `yarn` in your terminal at the project root.

## Required Technologies
Your application must make use of the following libraries:
- Postgres for the database
- Node/Express for the application logic
- dotenv from npm for managing environment variables
- db-migrate from npm for migrations
- jsonwebtoken from npm for working with JWTs
- jasmine from npm for testing

## Steps to Completion

### 1. Plan to Meet Requirements

In this repo there is a `REQUIREMENTS.md` document which outlines what this API needs to supply for the frontend, as well as the agreed upon data shapes to be passed between front and backend. This is much like a document you might come across in real life when building or extending an API. 

Your first task is to read the requirements and update the document with the following:
- Determine the RESTful route for each endpoint listed. Add the RESTful route and HTTP verb to the document so that the frontend developer can begin to build their fetch requests.    
**Example**: A SHOW route: 'blogs/:id' [GET] 

- Design the Postgres database tables based off the data shape requirements. Add to the requirements document the database tables and columns being sure to mark foreign keys.   
**Example**: You can format this however you like but these types of information should be provided
Table: Books (id:varchar, title:varchar, author:varchar, published_year:varchar, publisher_id:string[foreign key to publishers table], pages:number)

**NOTE** It is important to remember that there might not be a one to one ratio between data shapes and database tables. Data shapes only outline the structure of objects being passed between frontend and API, the database may need multiple tables to store a single shape. 

### 2.  DB Creation and Migrations

Now that you have the structure of the databse outlined, it is time to create the database and migrations. Add the npm packages dotenv and db-migrate that we used in the course and setup your Postgres database. If you get stuck, you can always revisit the database lesson for a reminder. 

You must also ensure that any sensitive information is hashed with bcrypt. If any passwords are found in plain text in your application it will not pass.

### 3. Models

Create the models for each database table. The methods in each model should map to the endpoints in `REQUIREMENTS.md`. Remember that these models should all have test suites and mocks.

### 4. Express Handlers

Set up the Express handlers to route incoming requests to the correct model method. Make sure that the endpoints you create match up with the enpoints listed in `REQUIREMENTS.md`. Endpoints must have tests and be CORS enabled. 

### 5. JWTs

Add JWT functionality as shown in the course. Make sure that JWTs are required for the routes listed in `REQUIUREMENTS.md`.

### 6. QA and `README.md`

Before submitting, make sure that your project is complete with a `README.md`. Your `README.md` must include instructions for setting up and running your project including how you setup, run, and connect to your database. 

Before submitting your project, spin it up and test each endpoint. If each one responds with data that matches the data shapes from the `REQUIREMENTS.md`, it is ready for submission!




# Store Backend Project
This Project goes beyond the requirements for the udacity full stack javascript developer project. 
I decided to build the project based on the django rest framework to be more flexible and scalable.

# Installation

## Install postgres
If not already installed, install postgres to provide the database.

#### Create the file repository configuration:
`sudo sh -c 'echo "deb http://apt.postgresql.org/pub/repos/apt $(lsb_release -cs)-pgdg main" > /etc/apt/sources.list.d/pgdg.list'`

#### Import the repository signing key:
`wget --quiet -O - https://www.postgresql.org/media/keys/ACCC4CF8.asc | sudo apt-key add -`

#### Update the package lists:
`sudo apt-get update`

#### Install the latest version of PostgreSQL.
#### If you want a specific version, use 'postgresql-12' or similar instead of 'postgresql':
`sudo apt-get -y install postgresql`

## Install python dependencies
Create python virtual environment and install required python packages.
```bash
install.sh
```

To activate the Environment call `source ena.sh`

## Setup Database
### Create postgresql database

Use `sudo -u postgres psql template1` to open up the postgres-command prompt and insert the following

```sql
  CREATE DATABASE webstore_db;
  CREATE DATABASE  webstore_test;
  CREATE ROLE webstore_user WITH LOGIN PASSWORD 'webstore_pass'; 
  ALTER ROLE webstore_user SET client_encoding TO 'utf8';
  ALTER ROLE webstore_user SET default_transaction_isolation TO 'read committed';
  ALTER ROLE webstore_user SET timezone TO 'UTC';


  GRANT ALL PRIVILEGES ON DATABASE webstore_db TO webstore_user;
  GRANT ALL PRIVILEGES ON DATABASE webstore_test TO webstore_user;
  ALTER USER webstore_user CREATEDB;
```

## Migrate Databae
Migrate the Database using:

```
db-migrate up
```

## Unittests
run tests
```
$ ./manage.py test
```

# Run the server
start server
```
$ npm run start
```

# API

## Users

Show All Users [TOKEN REQUIRED]
```
GET http://localhost:3000/user/
```
Show User by ID [TOKEN REQUIRED]
```
GET http://localhost:3000/user/:id
curl -X POST -H "Content-Type: application/json" -d '{"username": "USERNAME", "password": "PASSWORD"}' http://localhost:3000/api/token/
```
Create User [TOKEN REQUIRED]
```
POST http://localhost:3000/user/

curl -X POST -H "Content-Type: application/json" -d '{
  "first_name": "first",
  "last_name": "last",
  "username": "test category",
  "password": "xxxxx"
  }'  http://localhost:3000/user/ 
  --header "authorization: eyJhbGciOiJIUzI1NiJ9.MTI.xpcDRUukiWvZQC2IBy-3Lj4dzVnf_B2CydCsqnf4ItU"
```
Delete User [TOKEN REQUIRED]
```
DELETE http://localhost:3000/user/:id

curl -X DELETE -H "Content-Type: application/json" http://localhost:3000/user/10 --header "authorization: eyJhbGciOiJIUzI1NiJ9.MTI.xpcDRUukiWvZQC2IBy-3Lj4dzVnf_B2CydCsqnf4ItU"
```

## Products
The Products endpoint can be accessed by any user (logged in or not). Writing access requires special permissions (`user.is_staff` is `True`).

Show All Products
```
GET http://localhost:3000/products/
```
Show Product by ID
```
GET http://localhost:3000/products/:id
```
Show Products by Category
```
GET http://localhost:3000/products/:category
```
Add Product [TOKEN REQUIRED]
```
POST http://localhost:3000/products/
```
Delete Product [TOKEN REQUIRED]
```
http://localhost:3000/products/:id
```


## Orders

{
    "product_id": "2",
    "quantity": 2,
    "user_id": 4
}


# JSON Web Token Authentication
The token is returned when adding a new user in the response.

To access endpoints requiring a token, the token needs to be embedded into the header.

