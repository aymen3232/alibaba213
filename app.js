var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var load = require('express-load');
var mongoose = require('mongoose');
var config = require('./config/database'); // Importation du fichier de configuration
var flash = require('express-flash');
var moment = require('moment');
var expressValidator = require('express-validator');
var { MongoClient } = require('mongodb');
var User = require('./models/users');
var Equip = require('./models/equip');
var Products = require('./models/products');



var router = express.Router();
var app = express();

// Connection à MongoDB via le fichier de configuration
mongoose.connect(config.database, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true // Ajoutez cette ligne
});
// Middlewares
var erros = require('./middleware/erros');



// Setup des views
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// Config des Middlewares
app.use(favicon());
app.use('/uploads', express.static('uploads'));

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(expressValidator());
app.use(cookieParser());
app.use(session({
    secret: config.secret, // Utilisation du secret depuis le fichier de configuration
    resave: true,
    saveUninitialized: false
}));
app.use(flash());

// Config de Helpers
app.use(function(req, res, next) {
    res.locals.moment = moment;
    res.locals.session = req.session.user;
    res.locals.isLogged = req.session.user ? true : false;
    next();
});

// Controlador de rotas
load('models').then('controllers').then('routes').into(app);
app.use(express.static(path.join(__dirname, '/public')));

app.use(erros.notfound);
app.use(erros.serverError);

app.listen(3001, function() {
    console.log('Express server listening on port 3001');
});