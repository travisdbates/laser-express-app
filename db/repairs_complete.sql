UPDATE repairs SET status = 'Complete'
WHERE repairsid = $1
returning *;