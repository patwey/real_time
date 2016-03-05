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

var shareResultsBtn = document.getElementById('share-results');

if (shareResultsBtn) {
  shareResultsBtn.addEventListener('click', function() {
    socket.send('shareResults', { pollId: this.getAttribute('data-id') });
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

socket.on('resultsShared', function (pollId) {
  var pollResultsList = document.getElementById(pollId + '-results');
  var pollShareResultsStatusSpan = document.getElementById(pollId + '-share-results-status');
  if (pollResultsList) {
    pollResultsList.className = 'list-group visible ';
  }
  if (pollShareResultsStatusSpan) {
    pollShareResultsStatusSpan.innerText = ' Results Shared!';
    shareResultsBtn.className += 'hidden';
  }
});
