require('dotenv').config();
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const massive = require('massive');
const passport = require('passport');
const Auth0Strategy = require('passport-auth0');

const customers_controller = require('./controllers/customers_controller')
const app = express();

app.use( express.static(`${__dirname}/../build`))


app.use(bodyParser.json());

/** Order matters **
 * 
 * use session
 * 
 * then passport.initialize
 * 
 * then passport.session
 * 
 */

app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false
}))

app.use(passport.initialize());
app.use(passport.session());

//Sets our connection string to db variable so we can call on it later

massive(process.env.CONNECTION_STRING).then( db => {
    console.log("Connected to DB")
    app.set('db', db)

    //console.log(db)

    // {db: dbObject}
})

passport.use(new Auth0Strategy({
    domain: process.env.AUTH_DOMAIN,
    clientID: process.env.AUTH_CLIENT_ID,
    clientSecret: process.env.AUTH_CLIENT_SECRET,
    callbackURL: process.env.CALLBACK_URL
},
    function (accessToken, refreshToken, extraParams, profile, done) {
        //db calls will be used here, and create users in our database

        const db = app.get('db')
        //console.log(db)

        db.find_user([profile.identities[0].user_id]).then(user =>{
            if (user[0]){
                return done(null, user[0].id)
            }
            else {
                db.create_user([profile._json.name, profile._json.email, profile._json.picture,profile._json.identities[0].user_id, profile._json.app_metadata.roles[0]])
                .then( user => {
                    return done(null, user[0].id)
                })
            }
            console.log(user)
        })
    }
))

app.get("/auth", passport.authenticate('auth0'));
app.get("/auth/callback", passport.authenticate('auth0', {
    successRedirect: process.env.SUCCESS_REDIRECT,
    failureRedirect: process.env.FAILURE_REDIRECT
}))

app.get('/auth/me', (req,res) => {
    if(!req.user){
        return res.status(200).send(false)
    }
    
    return res.status(200).send(req.user)
})

app.get('/auth/logout', (req,res)=> {
    req.logOut();
    res.redirect(302,"/")
})

passport.serializeUser(function (id, done) {
    done(null, id)
})

//user represents whoever is logged in from the session

passport.deserializeUser(function (id, done) {
    app.get('db').find_current_user([id])
    .then(user => {
        done(null, user[0])
    })
    
})

//CUSTOMERS ************************************************
app.get('/api/customers/get',(req, res, next) => {
    app.get('db').customers_return_all()
    .then(customers => {
        res.status(200).send(customers)
    })
})

app.get('/api/customers/getone/:id',(req,res) => {
    const custID = req.params.id;
    app.get('db').customers_return_one([custID])
    .then(customer => {
        res.status(200).send(customer)
    })
})

app.get('/api/customers/getselect',(req,res) => {
    app.get('db').customers_for_select()
    .then(customer => {
        res.status(200).send(customer)
    })
})

app.post('/api/customers/insert',(req,res) => {
    var customer = [
        req.body.name,
        req.body.phone,
        req.body.streetaddress,
        req.body.city,
        req.body.state
    ]
    
    app.get('db').customers_insert(customer)
    .then(customers => {
        res.status(200).send(customers)
    })
})

//REPAIRS ************************************************

app.get('/api/repairs/get', (req, res) => {
    app.get('db').repairs_return_all()
    .then(repairs => {
        res.status(200).send(repairs)
    })
})

app.get('/api/repairs/getcomplete', (req,res) => {
    app.get('db').repairs_get_complete()
    .then(repairs => {
        res.status(200).send(repairs)
    })
})

app.get('/api/repairs/count', (req, res) => {
    app.get('db').repairs_count()
    .then(repairs => {
        res.status(200).send(repairs)
    })
})

app.post('/api/repairs/insert',(req,res) => {
    var repair = [
        req.body.customerID,
        req.body.date,
        req.body.time,
        req.body.status,
        req.body.contactName,
        req.body.streetAddress,
        req.body.city,
        req.body.state,
        req.body.phone,
        req.body.printer,
        req.body.tech,
        req.body.symptoms,
        req.body.orderStatus,
        req.body.invoiceStatus,
        req.body.notes
    ]
    
    app.get('db').repairs_insert(repair)
    .then(repair => {
        res.status(200).redirect('/#/repairs')
    })
})

app.put('/api/repairs/updateorder/:id', (req,res) => {
    const deliveryID = req.params.id;
    app.get('db').repairs_updateorder([deliveryID])
    .then (response => {
        res.status(200).send(response)
    })

})

app.put('/api/repairs/updateinvoice/:id', (req,res) => {
    const deliveryID = req.params.id;
    console.log(deliveryID)
    app.get('db').repairs_updateinvoice([deliveryID])
    .then (response => {
        res.status(200).send(response)
    })

})

app.put('/api/repairs/completerepair/:id', (req,res) => {
    const repairID = req.params.id;
    app.get('db').repairs_complete([repairID])
    .then(response => {
        res.status(200).send(response)
    })
})

app.get('/api/repairs/d3count', (req, res) => {
    app.get('db').repairs_counts_for_d3()
    .then(response => {
        res.status(200).send(response)
    })
})

app.delete('/api/repairs/deleterepair/:id', (req,res) => {
    const repairID = req.params.id;
    app.get('db').repairs_delete([repairID])
    .then(response => {
        res.status(200).send(response)
    })
})

//DELIVERIES ************************************************
app.get('/api/deliveries/getall', (req,res) => {
    app.get('db').deliveries_return_all()
    .then(deliveries => {
        res.status(200).send(deliveries)
    })
})

app.get('/api/deliveries/getcomplete', (req,res) => {
    app.get('db').deliveries_getcomplete()
    .then(deliveries => {
        res.status(200).send(deliveries)
    })
})

app.get('/api/deliveries/count', (req, res) => {
    app.get('db').deliveries_count()
    .then(deliveries => {
        res.status(200).send(deliveries)
    })
})

app.post('/api/deliveries/insert',(req,res) => {
    var delivery = [
        req.body.customerid,
        req.body.date,
        req.body.time,
        req.body.status,
        req.body.contactname,
        req.body.streetaddress,
        req.body.city,
        req.body.state,
        req.body.phone,
        req.body.cartridge,
        req.body.tech,
        req.body.orderstatus,
        req.body.invoicestatus,
        req.body.notes,
        req.body.quantity
    ]
    
    app.get('db').deliveries_insert(delivery)
    .then(delivery => {
        res.status(200).send(delivery)
    })
})

app.put('/api/deliveries/updateorder/:id', (req,res) => {
    const deliveryID = req.params.id;
    app.get('db').deliveries_updateorder([deliveryID])
    .then (response => {
        res.status(200).send(response)
    })

})

app.put('/api/deliveries/updateinvoice/:id', (req,res) => {
    const deliveryID = req.params.id;
    console.log(deliveryID)
    app.get('db').deliveries_updateinvoice([deliveryID])
    .then (response => {
        res.status(200).send(response)
    })

})

app.put('/api/deliveries/completedelivery/:id', (req,res) => {
    const deliveryID = req.params.id;
    app.get('db').deliveries_complete([deliveryID])
    .then(response => {
        res.status(200).send(response)
    })
})

app.get('/api/deliveries/d3count', (req, res) => {
    app.get('db').deliveries_counts_for_d3()
    .then(response => {
        res.status(200).send(response)
    })
})

app.put('/api/deliveries/deletedelivery/:id', (req,res) => {
    const deliveryID = req.params.id;
    app.get('db').deliveries_delete([deliveryID])
    .then(response => {
        res.status(200).send(response)
    })
})

//ORDERS ************************************************

app.get('/api/orders/getall', (req,res) => {
    app.get('db').orders_return_all()
    .then(orders => {
        res.status(200).send(orders)
    })
})

app.get('/api/orders/getcomplete', (req,res) => {
    app.get('db').orders_getcomplete()
    .then(orders => {
        res.status(200).send(orders)
    })
})

app.post('/api/orders/insert',(req,res) => {
    var order = [
        req.body.date,
        req.body.time,
        req.body.quantity,
        req.body.item,
        req.body.customer
    ]
    
    app.get('db').orders_insert(order)
    .then(order => {
        res.status(200).send(order)
    })
})

app.get('/api/orders/count', (req, res) => {
    app.get('db').orders_count()
    .then(orders => {
        res.status(200).send(orders)
    })
})

app.put('/api/orders/completeorder/:id', (req,res) => {
    const orderID = req.params.id;
    app.get('db').orders_complete([orderID])
    .then(response => {
        res.status(200).send(response)
    })
})

//TONERS ************************************************

app.get('/api/toners/getall', (req,res) => {
    app.get('db').toners_select()
    .then(toners => {
        res.status(200).send(toners)
    })
})

app.put('/api/toners/add/:id', (req,res) => {
    const id = req.params.id;
    app.get('db').toners_add([id])
    .then(toners => {
        res.status(200).send(toners)
    })
})

app.put('/api/toners/subtract/:id', (req,res) => {
    const id = req.params.id;
    app.get('db').toners_subtract([id])
    .then(toners => {
        res.status(200).send(toners)
    })
})

// STATIC **************************************************

app.post('/api/deliveriesapprove/insert',(req,res) => {
    var delivery = [
        req.body.customerid,
        req.body.date,
        req.body.time,
        req.body.status,
        req.body.contactName,
        req.body.streetAddress,
        req.body.city,
        req.body.state,
        req.body.phone,
        req.body.cartridge,
        req.body.tech,
        req.body.orderStatus,
        req.body.invoiceStatus,
        req.body.notes,
        req.body.quantity
    ]
    
    app.get('db').static_deliveries_insert(delivery)
    .then(delivery => {
        res.status(200).send(delivery)
    })
})

app.post('/api/repairsapprove/insert',(req,res) => {
    var repair = [
        req.body.customerid,
        req.body.date,
        req.body.time,
        req.body.status,
        req.body.contactName,
        req.body.streetAddress,
        req.body.city,
        req.body.state,
        req.body.phone,
        req.body.printer,
        req.body.tech,
        req.body.symptoms,
        req.body.orderStatus,
        req.body.invoiceStatus,
        req.body.notes
    ]
    
    app.get('db').static_repairs_insert(repair)
    .then(repair => {
        res.status(200).send(repair)
    })
})

app.get('/api/deliveriesapprove/get', (req,res) => {
    app.get('db').static_deliveries_return()
    .then(deliveries => {
        res.status(200).send(deliveries)
    })
})

app.get('/api/deliveriesapprove/count', (req, res) => {
    app.get('db').static_deliveries_count()
    .then(deliveries => {
        res.status(200).send(deliveries)
    })
})


const PORT = 3005
app.listen(PORT, () => console.log(`Listening on port ${PORT}`))