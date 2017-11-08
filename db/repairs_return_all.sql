SELECT * FROM Repairs
INNER JOIN Customers ON Repairs.customerid = Customers.customerid
WHERE status = 'In Process';