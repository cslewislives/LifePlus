
const express = require('express'),
    bodyParser = require('body-parser'),
    firebase = require('firebase'),
    path = require('path');

const config = require('./app/config/config');

const app = express();
const PORT = process.env.PORT || 1313;

firebase.initializeApp(config);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static("app/public"));


const routes = require('./app/controllers/routes/api-routes');
app.use(routes);


const exphbs = require('express-handlebars');

app.set('view engine', 'handlebars');
app.set("views", 'app/views');

app.engine('handlebars', exphbs({
    extname:'handlebars',
    defaultLayout:'main.handlebars',
    layoutsDir: 'app/views/layouts'
}));


app.listen(PORT, () => {
    console.log('App listening on PORT ' + PORT);
});
