UPDATE Toners
SET number = number - 1
WHERE tonerID = $1
RETURNING *;