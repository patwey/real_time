console.log('using client.js!');
var socket = io();

var pollOptionBtns = document.getElementsByClassName('option-btn');

if (pollOptionBtns) {
  for (var i = 0; i < pollOptionBtns.length; i++) {
    var button = pollOptionBtns[i];
    button.addEventListener('click', function() {
      socket.send('voteCast', { pollId: this.getAttribute('data-id'),
                                vote: this.getAttribute('data-vote') });
    });
  };
}

var closePollBtn = document.getElementById('close-poll');

if (closePollBtn) {
  closePollBtn.addEventListener('click', function() {
    socket.send('closePoll', { pollId: this.getAttribute('data-id') });
  });
}

socket.on('voteCounted', function (poll) {
  var options = poll.options;
  for (var i = 0; i < options.length; i++) {
    document.getElementById(options[i]).innerText = poll.voteCount[options[i]];
    document.getElementById(options[i] + '-percent').innerText = poll.percentages[options[i]];
  };
});

socket.on('pollClosed', function (pollId) {
  var pollStatusDiv = document.getElementById(pollId + '-poll-status');
  if (pollStatusDiv) {
    pollStatusDiv.innerText = 'closed';
  }
});
