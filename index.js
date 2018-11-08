const express = require('express');
const path = require('path');

// Create the express app
const app = express();
app.set('port', 1337);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'app/views'));

// Include the controller route
const PeopleController = require('./app/controllers/people_controller');
const FrontController = require('./app/controllers/front_controller');

app.get('/api/v1/people', PeopleController.index);
app.get('/', FrontController.index)

// Start the application
app.listen(app.get('port'), () => {
    console.log(`App running on port ${app.get('port')}`)
});