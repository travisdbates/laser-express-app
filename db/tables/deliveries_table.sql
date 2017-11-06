CREATE TABLE Deliveries (
    deliveriesID SERIAL PRIMARY KEY,
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
    cartridge text[],
    tech VARCHAR(255),
    orderStatus BOOLEAN DEFAULT false,
    invoiceStatus BOOLEAN DEFAULT false,
    notes VARCHAR(511),
    quantity integer[]
)