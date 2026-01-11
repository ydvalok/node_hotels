const express = require('express')
const app = express();
const db = require('./db');
require('dotenv').config();
const passport = require('./auth');


app.use(express.json()); // for JSON bodies
app.use(express.urlencoded({ extended: true })); // for form submissions

const PORT = process.env.PORT || 3000;


// Middleware Function
const logRequest = (req, res, next) => {
    // console.log(`[${new Date().toLocaleString()}] Request Made to : ${req.originalUrl}`);
    next(); // Move on to the next phase
}
app.use(logRequest);

app.use(passport.initialize());
const localAuthMidlleware = passport.authenticate('local',{session:false})

// home route
app.get('/', function (req, res) {
    res.send('Welcome to our Hotel');
});

// Import the router files
const personRoutes = require('./routes/personroutes');
const menuItemRoutes = require('./routes/menuitemRoutes');


// Use the routers
app.use('/person', personRoutes);
app.use('/menu', menuItemRoutes);
  
app.listen(PORT, ()=>{
    console.log('listening on port 3000');
})









