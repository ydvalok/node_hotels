const express = require('express');
const app = express();
const db = require('./db');

const bodyParser = require('body-parser');
app.use(bodyParser.json());

  // another example


app.get('/', (req, res) => {
  res.send('welcome to server');
});


// import person routes file
const personRoute = require('./routes/personRoute');
const menuRoutes = require('./routes/menuitemRoutes');
//use the router
app.use('/person', personRoute); 
app.use('/menu', menuRoutes)


app.listen(3000, () => {
  console.log('listening on port 3000');
});  

            