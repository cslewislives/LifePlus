const express = require('express');
const router = express.Router();
const path = require('path');

var login = require('../../models/userSignup');


// router.get('/', (req, res) => {
//     res.sendFile(path.join(__dirname, "../../views/login-page.html"));
// });


const exphbs = require('express-handlebars');

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'handlebars');

app.listen(PORT, () => {
    console.log('App listening on PORT ' + PORT);
});

app.get("/", function(req, res) {
    res.render("index");
  });




module.exports = router;