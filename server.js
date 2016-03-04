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

if (app.get('port') === 3000) {
  app.locals.root = 'localhost:3000';
} else {
  app.locals.root = 'real-time-patwey.herokuapp.com';
}

app.locals.polls = {};  
app.locals.votes = {};

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

  var link = { fullPath:  app.locals.root + '/polls/' + poll.id,
               localPath: '/polls/' + poll.id };

  response.render('admin', { poll: poll, link: link })
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
  socket.on('message', function (channel, message) {
    if (channel === 'voteCast') {
      app.locals.votes[socket.id] = message.vote;
      poll = app.locals.polls[message.pollId]

      if (poll.status == "open") {
        poll = new Poll(app.locals.polls[message.pollId]);
        poll = poll.update(app.locals.votes);
        io.sockets.emit('voteCounted', poll);
      }
    }

    if (channel === 'closePoll') {
      app.locals.polls[message.pollId].status = "closed";
      io.sockets.emit('pollClosed', message.pollId);
    }
  });
});

module.exports = app;
