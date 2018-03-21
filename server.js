//TODO: Create server.

const express = require('express'),
    bodyParser = require('body-parser'),
    firebase = require('firebase');
    path = require('path');

const app = express();
const PORT = process.env.PORT || 1313;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static("app/public"));

// const exphbs = require('express-handlebars');

// app.engine('handlebars', exphbs({ defaultLayout: 'main' }));

// app.set('view engine', 'handlebars');

app.listen(PORT, () => {
    console.log('App listening on PORT ' + PORT);
})

 
app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "app/views/login-page.html"));
  });

  app.get("/search", function(req, res) {
    res.sendFile(path.join(__dirname, "app/views/search.html"));
  });

  app.get("/user", function(req, res) {
    res.sendFile(path.join(__dirname, "app/views/userinfo.html"));
  });

