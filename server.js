//TODO: Create server.

const express = require('express'),
    bodyParser = require('body-parser'),
    firebase = require('firebase'),
    path = require('path');

const config = require('./app/config/config');

const app = express();
const PORT = process.env.PORT || 1313;

firebase.initializeApp(config);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static("app/public"));


const routes = require('./app/controllers/routes/api-routes');
app.use(routes);

// const exphbs = require('express-handlebars');

// app.engine('handlebars', exphbs({ defaultLayout: 'main' }));

// app.set('view engine', 'handlebars');


app.listen(PORT, () => {
    console.log('App listening on PORT ' + PORT);
});


