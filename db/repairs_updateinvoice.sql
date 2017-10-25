UPDATE repairs SET invoicestatus = NOT invoicestatus
WHERE repairsid = $1
returning *;