require('dotenv').config();
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const massive = require('massive');
const passport = require('passport');
const Auth0Strategy = require('passport-auth0');

const app = express();

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
                db.create_user([profile._json.name, profile._json.email, profile._json.picture,profile._json.identities[0].user_id])
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
    successRedirect: 'http://localhost:3000/#/dashboard',
    failureRedirect: '/auth'
}))

app.get('/auth/me', (req,res) => {
    if(!req.user){
        return res.status(404).send("User not found")
    }
    
    return res.status(200).send(req.user)
})

app.get('/auth/logout', (req,res)=> {
    req.logOut();
    res.redirect(302,"http://localhost:3000/#/")
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

app.get('/api/customers/get',(req, res) => {
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

app.get('/api/repairs/get', (req, res) => {
    app.get('db').repairs_return_all()
    .then(repairs => {
        res.status(200).send(repairs)
    })
})

const PORT = 3005
app.listen(PORT, () => console.log(`Listening on port ${PORT}`))