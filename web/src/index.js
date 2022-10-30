var express = require('express');
var path = require('path');
const exphbs = require('express-handlebars');
const methodOverride = require('method-override');
const session = require ('express-session');
const flash = require('connect-flash');
var bodyParser = require('body-parser');


//Iniciadores
var app = express();

//Configuraciones
app.set('port', process.env.PORT || 8080);
app.set('views', path.join(__dirname,'views'));
app.engine('.hbs', exphbs({
  defaultLayout: 'main',
  layoutsDir: path.join(app.get('views'),'layouts'),
  partialsDir: path.join(app.get('views'), 'partials'),
  extname: '.hbs'
}));

app.set('view engine', '.hbs');


//Middlewares
app.use(express.urlencoded({extended:false}));
app.use(methodOverride('_method'));
app.use(session({
    secret: 'mysecretapp',
    resave: true,
    saveUninitialized: true
}));
app.use(flash());

// Variables globales
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
})

//Routes
app.use(require('./routes/index'));
app.use(require('./routes/consultas'));
app.use(require('./routes/gestion'));
app.use(require('./routes/InsertarArchivo'));
// app.use(require('./routes/relaciones'));


//Archivos estaticos
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'Descargas')));

app.listen(app.get('port'), function(){
    console.log('Se ha conectado en el puerto: ', app.get('port'));
});
