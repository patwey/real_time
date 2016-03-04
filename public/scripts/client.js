console.log('using client.js!');
var socket = io();

var pollOptionBtns = document.getElementsByClassName('option');

for (var i = 0; i < pollOptionBtns.length; i++) {
  var button = pollOptionBtns[i];
  button.addEventListener('click', function() {
    socket.send(this.getAttribute('data-id'), this.textContent)
  });
};

socket.on('voteCounted', function (poll) {
  var options = Object.keys(poll.options);
  for (var i = 0; i < options.length; i++) {
    var option = options[i];
    document.getElementById(option).innerText = poll.options[option];
  };
});
