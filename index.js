var express = require('express'),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    mongoose = require('mongoose'),
    expressSession = require('express-session'),
    mongooseSesson = require('mongoose-session'),  // https://github.com/chncdcksn/mongoose-session
    usersRoutes = require('./routes/users');
    app = express(),
    port = 30000;

var dbName = 'bookitDB';
var connectionString = 'mongodb://localhost:27017/' + dbName;

mongoose.connect(connectionString);

/* Routes

Route                   Http Verb       Description
api/users               get             Get all users
api/users               post            Create a user
api/users/:id           get             Get user for id
api/users/:id           put             Update user for id
api/users/:id           delete          Delete user for id

*/


app.use(expressSession({
        key: 'session',
        secret: '128013A7-5B9F-4CC0-BD9E-4480B2D3EFE9',
        store: new mongooseSesson(mongoose),
        resave: true,
        saveUninitialized: true
    })
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api', usersRoutes);

var server = app.listen(port, function () {
    console.log('Express server listening on port ' + server.address().port);
});