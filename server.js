const http = require('http');
const express = require('express');
const app = express();
const path = require('path');

const bodyParser = require('body-parser');
const sanitizePollData = require('./lib/sanitize-poll-data');
var Poll = require('./lib/poll')

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.set('port', process.env.PORT || 3000);
app.set('view engine', 'jade');

app.locals.title = 'Real Time';
app.locals.polls = {};

app.get('/', (request, response) => {
  response.render('index');
});

app.get('/new', (request, response) => {
  response.render('new');
});

app.post('/new', (request, response) => {
  poll = new Poll(sanitizePollData(request.body));

  app.locals.polls[poll.id] = poll

  response.redirect('/admin/polls/' + poll.id);
});

app.get('/admin/polls/:id', (request, response) => {
  var poll = app.locals.polls[request.params.id];

  response.render('admin', { poll: poll })
});

app.get('/polls/:id', (request, response) => {
  var poll = app.locals.polls[request.params.id];

  response.render('poll', { poll: poll });
});

var port = process.env.PORT || 3000;
var server = http.createServer(app);

server.listen(port, function () {
  console.log('Listening on port ' + port + '.');
});

const socketIo = require('socket.io');
const io = socketIo(server);

io.on('connection', function(socket) {

});

module.exports = app;
