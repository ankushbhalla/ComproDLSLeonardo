var express = require('express');
var basicAuth = require('express-basic-auth')
const http = require('http');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var app = express();



function getUnauthorizedResponse(req) {
    return req.auth ?
        ('Credentials ' + req.auth.user + ':' + req.auth.password + ' rejected') :
        'No credentials provided'
}

function getUserAuthentication(tenant){
  let tenantMap ={
    "compro":"c0mpr0",
    "tts":"tts",
    "automotive":"automotive"
  }
  return {[tenant]:tenantMap[tenant]};
}

function getDefaultVersion(tenant){
  let defaultVersionMap = {
    "compro":"April18"
  }
  if(defaultVersionMap[tenant]){
    return defaultVersionMap[tenant];
  }
  return;
}

function isValidTenant(tenant){
  let tenantMap ={
    "compro":"c0mpr0",
    "tts":"c1mpr1",
    "automotive":"c2mpr2"
  }
  if(tenantMap[tenant]){
    return true;
  }
  else{
    return false;
  }
}

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'dist')));

// For tenant/version - Start
app.use('/:tenant',(req, res, next) => {
  var tenant = req.params.tenant;
  if(isValidTenant(tenant) == false){
    next();
  }
  basicAuth({
  users: getUserAuthentication(tenant),
  challenge: true,
  unauthorizedResponse: getUnauthorizedResponse,
  realm: 'Leo Credential'
  })
  next();
})
app.get('/:tenant/:ver', (req, res) => {
  var tenant = req.params.tenant;
  var ver = req.params.ver;
  res.sendFile(path.join(__dirname, 'public/'+tenant+'/'+ver+'/launch.html'));
});
app.get('/:tenant/:ver/*', (req, res) => {
  var tenant = req.params.tenant;
  var ver = req.params.ver;
  res.sendFile(path.join(__dirname, 'public/'+tenant+'/'+ver+'/launch.html'));
});
// For tenant - End

// For tenant - Start
// app.use('/:tenant',(req, res) => {
//   var tenant = req.params.tenant;
//   basicAuth({
//   users: getUserAuthentication(tenant),
//   challenge: true,
//   unauthorizedResponse: getUnauthorizedResponse,
//   realm: 'Leo Credential'
//   }
// )})
app.get('/:tenant', (req, res, next) => {
  var tenant = req.params.tenant;
  if(isValidTenant(tenant) == false){
    next();
  }
  var ver = getDefaultVersion(tenant);
  if(ver){
    res.sendFile(path.join(__dirname, 'public/'+tenant+'/'+ver+'/launch.html'));
  }
  else{
    res.sendFile(path.join(__dirname, 'public/'+tenant+'/launch.html'));
  }
  
});
app.get('/:tenant/*', (req, res, next) => {
  var tenant = req.params.tenant;
  if(isValidTenant(tenant) == false){
    next();
  }
  var ver = getDefaultVersion(tenant);
  if(ver){
    res.sendFile(path.join(__dirname, 'public/'+tenant+'/'+ver+'/launch.html'));
  }
  else{
    res.sendFile(path.join(__dirname, 'public/'+tenant+'/launch.html'));
  }
});
// For tenant/version - End

// Default Handling
app.use(basicAuth({
  users: { 'compro': 'c0mpr0' },
challenge: true,
unauthorizedResponse: getUnauthorizedResponse,
  realm: 'Leo Credential'
}))
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/compro/April18/launch.html'));
  
});
// Default Handling


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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

app.listen(process.env.PORT || 8080, function () {
    console.log('Example app listening on port 8080!')
  })

module.exports = app;
