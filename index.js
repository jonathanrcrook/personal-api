var express = require('express');
var bodyParser = require('body-parser');
var middleware = require('./controllers/middleware');
var mainCtrl = require('./controllers/mainCtrl');

var app = express();

app.use(bodyParser.json());

app.get('/name', mainCtrl.showName);
app.get('/location', mainCtrl.showLocation);
app.get('/occupations', mainCtrl.showOccupations);
app.get('/occupations/latest', mainCtrl.showOccupationsLatest); // (Hint: this is just basic Javascript to access the last value of an array - checkout .slice on MDN)
app.get('/hobbies', mainCtrl.showHobbies);
app.get('/hobbies/:type', mainCtrl.showHobbiesType); // Any hobbies that match the type property specified in the request parameter. (Hint: checkout the .filter method and the 2nd example of it
app.get('/family', mainCtrl.showFamilyRelation); // Allow for a 'relation' query to retrieve all family members that match a given relation.
app.get('/family/:gender', mainCtrl.showFamilyGender); // All family members of the specified gender (Hint: see the hint on the `/hobbies/:type` endpoint)
app.get('/restaurants', mainCtrl.showRestaurantsRating); // Allow for a 'rating' query to retrieve all restaurants with a rating greater than or equal to 2.
app.get('/restaurants/:name', mainCtrl.showRestaurants);
app.get('/skillz', mainCtrl.showSkillz);
app.get('/secrets/:username/:password', middleware.verifyUser, mainCtrl.storedSecrets);

app.put('/name', mainCtrl.updateName);
app.put('/location', mainCtrl.updateLocation);

app.post('/hobbies', mainCtrl.createHobbies);
app.post('/occupations', mainCtrl.createOccupations);
app.post('/family', mainCtrl.createFamily);
app.post('/restaurants', mainCtrl.createRestaurants);
app.post('/skillz', middleware.generateId, mainCtrl.postSkillz);

var port = 3000;
app.listen(port, function() {
  console.log('listening to port', port);
});
