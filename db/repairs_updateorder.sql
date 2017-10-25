UPDATE repairs SET orderstatus = NOT orderstatus
WHERE repairsid = $1
returning *;