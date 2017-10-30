UPDATE deliveriesforapproval SET status = 'Complete'
WHERE time = $1
returning *;