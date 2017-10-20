UPDATE deliveries SET invoicestatus = NOT invoicestatus
WHERE deliveriesid = $1
returning *;