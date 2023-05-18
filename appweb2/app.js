var mysql = require ('mysql');
var conexion = mysql.createConnection({
    host:'localhost',
    database:'crud_nodejs_db',
    user:'root',
    password:''
});
conexion.connect( function(error){
  if (error) {
      throw error;
  }else{
    console.log('Conexion Exitosa');
  }
});
 //mostrar
conexion.query('SELECT * from users', function(error,filas){
  if (error) 
    throw error;

    

    filas.forEach(fila => {
      
      console.log(fila);
      
      
    });
    /* fields.forEach(field => {
      console.log(`Nombre del campo: ${field.name}`);
      console.log(`Tipo de dato: ${field.type}`);
      console.log(`Longitud: ${field.length}`);
      // ...
    }); */
  
})
/* // insertar
conexion.query('INSERT INTO users (user, rol) VALUES ("Juanito6", "Adm"), ("Juanito7", "Adm")', function(error,results){
  if (error) 
    throw error;
    
    console.log('Registro Agregado',results);
  
}); */
//Actualziar
/* conexion.query('UPDATE users SET user ="Manuel", rol = "user" WHERE id IN (16, 17)', function(error, filas) {
  if (error) {
    throw error;
  }

  
    console.log(filas);
 
}); */
//ELIMINAR
/* conexion.query('DELETE FROM users WHERE id= 11',function(error,results){
if (error) 
  throw error;
  console.log('Regisyro ELimado',results);

}); */



conexion.end();

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
