const http = require('http');
const express = require('express');
const app = express();
const path = require('path');

const generateId = require('./lib/generate-id');
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));

app.set('port', process.env.PORT || 3000);
app.set('view engine', 'jade');

app.use(express.static('public'));

app.locals.title = 'Real Time';
app.locals.polls = {};

app.get('/', (request, response) => {
  response.render('index');
});

app.get('/new', (request, response) => {
  response.render('new');
});

app.post('/new', (request, response) => {
  var poll = { id: '', title: '', options: [] }
  var id = generateId();

  poll.id = id;
  poll.title = request.body.title;

  if (typeof request.body.options === "string") {
    poll.options.push(request.body.options);
  } else {
    for (option in request.body.options) {
      poll.option.push(option)
    }
  }

  app.locals.polls[id] = poll

  response.redirect('/admin/polls/' + id);
});

app.get('/admin/polls/:id', (request, response) => {
  var pollId = request.params.id;
  var poll = app.locals.polls[pollId];

  response.render('admin', { poll: poll, id: pollId })
});

app.get('/polls/:id', (request, response) => {
  var poll = app.locals.polls[request.params.id];

  response.render('poll', { poll: poll});
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
