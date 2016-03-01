const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

const path = require('path');

app.use(express.static('static'));

app.set('port', process.env.PORT || 3000);
app.locals.title = 'Real Time';

app.set('view engine', 'jade');

// 'controller' stuff

app.get('/', (request, response) => {
  response.render('index')
});

app.get('/new', (request, response) => {
  response.render('new')
});

// 'socket' stuff

io.on('connection', (socket) => {
  socket.emit('message', { text: 'Hello world' });
});

http.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is running on ${app.get('port')}.`);
});
