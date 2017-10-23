UPDATE deliveries SET status = 'Complete'
WHERE deliveriesid = $1
returning *;