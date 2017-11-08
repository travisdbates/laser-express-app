SELECT * FROM Deliveries as d
INNER JOIN Customers as c ON c.customerid = d.customerid
WHERE d.status = 'In Process'