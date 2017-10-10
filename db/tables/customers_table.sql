CREATE TABLE Customers  (
    customerId SERIAL PRIMARY KEY,
    name VARCHAR(255),
    phone VARCHAR(255),
    streetAddress VARCHAR(255),
    city VARCHAR(255),
    state VARCHAR(255)
)