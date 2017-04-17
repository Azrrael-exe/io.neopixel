var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var morgan = require('morgan')


app.use(morgan('short'))
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.get("/", function(req, res){
  res.render('index', {
    title : "io.neopixel"
  })
})

app.all('*', function(req, res) {
  res.redirect("/");
});

module.exports = app
