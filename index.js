const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const session = require('express-session');
const NameRoutes = require('./waiter');

const Models = require('./models');
const mongoUrl = process.env.MONGO_DB_URL || 'mongodb://localhost/waiter';
const models = Models(mongoUrl);
const nameRoutes = NameRoutes(models);



var app = express();
app.use(express.static('public'))

app.engine('handlebars', exphbs({
  defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');
app.use(bodyParser.urlencoded({
  extended: false
}))
app.use(bodyParser.json())

app.use(session({
  secret: 'keyboard cat',
  cookie: {
    maxAge: 60000 * 30
  }
}));


// GET	/waiters/:username	Show waiters a screen where they can select the days they can work on
app.get('/waiter/:username',nameRoutes.amagama);

// POST	/waiters/:username	Send the days a waiter can work to the server.
app.post('/waiter/:username',nameRoutes.waiters);

// GET	/days	Show your sister which days waiters can work
app.get("/days",nameRoutes.Days);
// app.get("/days", nameRoutes.amagama);
// app.get("/days",nameRoutes.Colors);
app.post("/clear", nameRoutes.clear);
app.post("/clear", nameRoutes.clear);

var port = process.env.PORT|| 3000;
app.listen(port, function() {


  console.log('Example app listening at http://%s:%s, ' + port);

});
