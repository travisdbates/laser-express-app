CREATE TABLE Deliveries (
    deliveriesId SERIAL PRIMARY KEY,
    customerId INT REFERENCES Customers(customerid),
    date DATE,
    time TIME,
    status VARCHAR(255),
    contactName VARCHAR(255),
    streetaddress VARCHAR(255),
    city VARCHAR(255),
    state VARCHAR(255),
    phone VARCHAR(255),
    location VARCHAR(255),
    cartridge VARCHAR(255),
    tech VARCHAR(255),
    orderStatus VARCHAR(255),
    invoiceStatus VARCHAR(255),
    notes VARCHAR(511)
)