/* Replace with your SQL commands */
CREATE TABLE products(
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    price NUMERIC NOT NULL,
    category VARCHAR(50)
);

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    username VARCHAR(100),
    password VARCHAR
);

CREATE TYPE order_status AS ENUM ('active', 'complete');

CREATE TABLE orders(
    id SERIAL PRIMARY KEY,
    user_id INTEGER,
    product_id INTEGER,
    quantity INTEGER DEFAULT 1,
    status order_status NOT NULL,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE 
);

