# Webstore Backend Project
This Project was created for the udacity full stack javascript developer project.

## Install dependencies
```bash
npm install

npm install -g db-migrate
```

## Setup dotenv
Create a file `.env` to the root directory and add the following.
This would normally not be included here, but is required to pass the udacity project.

```
POSTGRES_HOST=127.0.0.1
POSTGRES_DB=webstore_db
POSTGRES_TEST_DB=webstore_test
POSTGRES_USER=webstore_user
POSTGRES_PASSWORD=webstore_pass
BCRYPT_PASSWORD=crypt_password_dev
TOKEN_SECRET=token_pass
SALT_ROUNDS=10
ENV=dev
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
The server is started at localhost:3000 using the folowing command.
```
$ npm run start
```

## Unittests
run tests
```
npm run test
```

# API
The Database is running at `http://localhost:3000`

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

# Database Schema
##  List of relations
```
 Schema |         Name          |   Type   |     Owner     
--------+-----------------------+----------+---------------
 public | migrations            | table    | webstore_user
 public | migrations_id_seq     | sequence | webstore_user
 public | order_products        | table    | webstore_user
 public | order_products_id_seq | sequence | webstore_user
 public | orders                | table    | webstore_user
 public | orders_id_seq         | sequence | webstore_user
 public | products              | table    | webstore_user
 public | products_id_seq       | sequence | webstore_user
 public | users                 | table    | webstore_user
 public | users_id_seq          | sequence | webstore_user
```

## Table "public.order_products"
```
   Column   |  Type   | Collation | Nullable |                  Default                   
------------+---------+-----------+----------+--------------------------------------------
 id         | integer |           | not null | nextval('order_products_id_seq'::regclass)
 quantity   | integer |           |          | 
 order_id   | bigint  |           |          | 
 product_id | bigint  |           |          | 
Indexes:
    "order_products_pkey" PRIMARY KEY, btree (id)
Foreign-key constraints:
    "order_products_order_id_fkey" FOREIGN KEY (order_id) REFERENCES orders(id)
    "order_products_product_id_fkey" FOREIGN KEY (product_id) REFERENCES products(id)
```

## Table "public.orders"
```
 Column  |     Type     | Collation | Nullable |              Default               
---------+--------------+-----------+----------+------------------------------------
 id      | integer      |           | not null | nextval('orders_id_seq'::regclass)
 user_id | integer      |           |          | 
 status  | order_status |           | not null | 
Indexes:
    "orders_pkey" PRIMARY KEY, btree (id)
Foreign-key constraints:
    "orders_user_id_fkey" FOREIGN KEY (user_id) REFERENCES users(id) ON UPDATE CASCADE ON DELETE CASCADE
Referenced by:
    TABLE "order_products" CONSTRAINT "order_products_order_id_fkey" FOREIGN KEY (order_id) REFERENCES orders(id)
```

## Table "public.products"
```
  Column  |         Type          | Collation | Nullable |               Default                
----------+-----------------------+-----------+----------+--------------------------------------
 id       | integer               |           | not null | nextval('products_id_seq'::regclass)
 name     | character varying(50) |           | not null | 
 price    | numeric               |           | not null | 
 category | character varying(50) |           |          | 
Indexes:
    "products_pkey" PRIMARY KEY, btree (id)
Referenced by:
    TABLE "order_products" CONSTRAINT "order_products_product_id_fkey" FOREIGN KEY (product_id) REFERENCES products(id)
```

## Table "public.users"
```
   Column   |          Type          | Collation | Nullable |              Default              
------------+------------------------+-----------+----------+-----------------------------------
 id         | integer                |           | not null | nextval('users_id_seq'::regclass)
 first_name | character varying(100) |           |          | 
 last_name  | character varying(100) |           |          | 
 username   | character varying(100) |           |          | 
 password   | character varying      |           |          | 
Indexes:
    "users_pkey" PRIMARY KEY, btree (id)
Referenced by:
    TABLE "orders" CONSTRAINT "orders_user_id_fkey" FOREIGN KEY (user_id) REFERENCES users(id) ON UPDATE CASCADE ON DELETE CASCADE
```


# JSON Web Token Authentication
The token is returned when adding a new user in the response.

To access endpoints requiring a token, the token needs to be embedded into the header.

```
authorization: TOKEN
```
