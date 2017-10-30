INSERT INTO users 
(user_name, email, img, auth_id, authority) 
VALUES 
($1, $2, $3, $4, $5)
RETURNING *;