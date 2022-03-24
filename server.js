const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
var mongoose = require('mongoose');
const bodyParser = require('body-parser');
var Nilai = require('./api/models/nilaiModel');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/DataNilaiDB');

app.set('view engine', 'ejs')
app.set('views', 'views/pages')
app.use(express.static('public'))

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var routes = require('./api/routes/datanilaiRoutes'); //importing routes
routes(app); //register the route

app.listen(port);

console.log('Listening on: '+ port);