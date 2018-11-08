const express = require('express');

// Create the express app
const app = express();
app.set('port', 1337);

// Include the controller route
const PeopleController = require('./app/controllers/people_controller');
app.get('/api/v1/people', PeopleController.index);

// Start the application
app.listen(app.get('port'), () => {
    console.log(`App running on port ${app.get('port')}`)
});