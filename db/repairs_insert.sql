INSERT INTO Repairs (customerId, date, time, status, contactName, streetAddress, city, state, phone, printer,tech, symptoms, orderStatus, invoiceStatus, notes)
VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15)
RETURNING *;