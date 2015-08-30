var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var http = require('http').Server(app);
var socketIo = require('socket.io')(http);

app.set('port', (process.env.PORT || 5000));

// Serve static content from <project>/public/
app.use(express.static(__dirname + '/public'));

// Want req.body should contain any form data from browser
app.use(bodyParser.urlencoded({ extended: false }));

// Template files are located in <project>/views/
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

// Middleware for allowing CORS
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// Landing page
app.get('/', function(request, response) {
  response.render('pages/index');
});

// Example page for monitoring the keyword
app.get('/monitor/:keyword', function(request, response) {
  var model = {
    'keyword': request.params.keyword,
    'host': request.headers.host,
    'port': app.get('port')
  };
  response.render('pages/monitor', model );
});

// Notification endpoints
app.get('/notify/:keyword', function(request, response) {
  var keyword = request.params.keyword;
  socketIo.emit(keyword, keyword);
  response.sendStatus(200);
});
app.post('/notify/:keyword', function(request, response) {
  var keyword = request.params.keyword;
  var message = request.body.message || keyword;
  socketIo.emit(keyword, message);
  response.sendStatus(200);
});


// Start the server
http.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
