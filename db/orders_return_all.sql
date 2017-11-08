SELECT * FROM Orders
INNER JOIN Customers ON Orders.customerid = Customers.customerid
WHERE status = FALSE;