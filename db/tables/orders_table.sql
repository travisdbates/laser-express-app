CREATE TABLE Orders (
    ordersId SERIAL PRIMARY KEY,
    date DATE,
    time TIME,
    quantity INT,
    item VARCHAR(255),
    customer VARCHAR(255),
    cost INT,
    orderNumber VARCHAR(255),
    vendor VARCHAR(255),
    notes VARCHAR(255)
)