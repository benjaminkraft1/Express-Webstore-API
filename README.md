# Webstore Backend Project
This Project was created for the udacity full stack javascript developer project.

## Install dependencies
```bash
npm install
```

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

## Build the project
```
$ npm run build
```

## Migrate Databae
Migrate the Database using:

```
db-migrate up
```

# Run the server
start server
```
$ npm run start
```

## Unittests
run tests
```
npm run test
```


# API

## Users
User Fields
```
type User = {
  first_name: string;
  last_name: string;
  username: string;
  password: string;
};
```

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

curl -X POST -H "Content-Type: application/json, authorization: eyJhbGciOiJIUzI1NiJ9.MTI.xpcDRUukiWvZQC2IBy-3Lj4dzVnf_B2CydCsqnf4ItU" -d '{
  "first_name": "first",
  "last_name": "last",
  "username": "test category",
  "password": "xxxxx"
  }'  http://localhost:3000/user/ 
```
Delete User [TOKEN REQUIRED]
```
DELETE http://localhost:3000/user/:id

curl -X DELETE -H "Content-Type: application/json, authorization: eyJhbGciOiJIUzI1NiJ9.MTI.xpcDRUukiWvZQC2IBy-3Lj4dzVnf_B2CydCsqnf4ItU" http://localhost:3000/user/1
```

## Products
Product Fields
```
type Product = {
  name: string;
  price: number;
  category: string;
};
```

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
DELETE http://localhost:3000/products/:id
```

## Orders
Order Fields
```
type Order = {
  product_id: number;
  quantity: number;
  user_id: number;
  status: string;
};
```

Get latest active Order by user id [TOKEN REQUIRED]
```
GET http://localhost:3000/current_orders/:user_id
```

Get completed Orders by user id [TOKEN REQUIRED]
```
GET http://localhost:3000/completed_orders/:user_id
```

Create new Order [TOKEN REQUIRED]
```
POST http://localhost:3000/orders/
```

Delete Order [TOKEN REQUIRED]
```
DELETE http://localhost:3000/orders/:id
```

# JSON Web Token Authentication
The token is returned when adding a new user in the response.

To access endpoints requiring a token, the token needs to be embedded into the header.

```
authorization: TOKEN
```
