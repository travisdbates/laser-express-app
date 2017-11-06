CREATE TABLE Repairs (
    repairsID SERIAL PRIMARY KEY,
    customerId INT REFERENCES Customers(customerid),
    date DATE,
    time TIME,
    status VARCHAR(255),
    contactName VARCHAR(255),
    streetaddress VARCHAR(255),
    city VARCHAR(255),
    state VARCHAR(255),
    phone VARCHAR(255),
    location VARCHAR(255),
    printer VARCHAR(255),
    idNumber VARCHAR(255),
    tech VARCHAR(255),
    symptoms VARCHAR(255),
    orderStatus VARCHAR(255),
    invoiceStatus VARCHAR(255),
    notes VARCHAR(511)
)


-- repairsid	        integer	NOT NULL	DEFAULT nextval('repairs_repairsid_seq'::regclass)		
-- customerid	        integer				
-- date	                date				
-- time	                time        without time zone				
-- status	            character varying (259)				
-- contactname	        character varying (259)				
-- streetaddress	    character varying (259)				
-- city	                character varying (259)				
-- state	            character varying (259)				
-- phone	            character varying (259)				
-- location	            character varying (259)				
-- printer	            character varying (259)				
-- idnumber	            character varying (259)				
-- tech	                character varying (259)				
-- symptoms	            character varying (259)				
-- orderstatus	        boolean		DEFAULT false		
-- invoicestatus	    boolean		DEFAULT false		
-- notes                character varying (515)	



-- deliveriesid	        integer	NOT NULL	DEFAULT nextval('deliveries_deliveriesid_seq'::regclass)		
-- customerid	        integer				
-- date	                date				
-- time	                time without time zone				
-- status	            character varying (259)				
-- contactname         	character varying (259)				
-- streetaddress	    character varying (259)				
-- city	                character varying (259)				
-- state            	character varying (259)				
-- phone            	character varying (259)				
-- location         	character varying (259)				
-- cartridge        	text[]		DEFAULT '{}'::text[]		
-- tech	                character varying (259)				
-- orderstatus	        boolean		DEFAULT false		
-- invoicestatus	    boolean		DEFAULT false		
-- notes	            character varying (515)				
-- quantity	            integer[]


CREATE TABLE Repairsforapproval (
    repairsID SERIAL PRIMARY KEY,
    customerId int,
    date DATE,
    time TIME,
    status VARCHAR(255),
    contactName VARCHAR(255),
    streetaddress VARCHAR(255),
    city VARCHAR(255),
    state VARCHAR(255),
    phone VARCHAR(255),
    location VARCHAR(255),
    printer VARCHAR(255),
    idNumber VARCHAR(255),
    tech VARCHAR(255),
    symptoms VARCHAR(255),
    orderStatus BOOLEAN DEFAULT false,
    invoiceStatus BOOLEAN DEFAULT false,
    notes VARCHAR(511)
)