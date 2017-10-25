UPDATE orders SET status = NOT status
WHERE ordersid = $1
returning *;