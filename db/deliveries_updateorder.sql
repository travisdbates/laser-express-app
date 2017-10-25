UPDATE deliveries SET orderstatus = NOT orderstatus
WHERE deliveriesid = $1
returning *;