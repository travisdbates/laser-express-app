UPDATE Deliveries SET 
contactname = $1,
cartridge = $2,
quantity = $3,
notes = $4,
tech = $5
WHERE deliveriesid = $6
RETURNING *