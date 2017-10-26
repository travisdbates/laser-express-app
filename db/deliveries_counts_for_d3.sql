SELECT COUNT (*), date FROM deliveries 
GROUP BY date
ORDER BY date DESC
LIMIT 10;
