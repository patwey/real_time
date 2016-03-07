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

var scheduleCloseBtn = document.getElementById('schedule-close');

if (scheduleCloseBtn) {
  scheduleCloseBtn.addEventListener('click', function() {
    var minTillClose = document.getElementById('minutes-till-close').value
    socket.send('scheduleClose', { pollId: this.getAttribute('data-id'), minTillClose: minTillClose });
  });
}

var submitCommentBtn = document.getElementById('submit-comment');

if (submitCommentBtn) {
  submitCommentBtn.addEventListener('click', function() {
    var commentBox = document.getElementById('comment-box');
    var comment = commentBox.value;
    commentBox.value = '';
    socket.send('addComment', { pollId: this.getAttribute('data-id'), comment: comment });
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

socket.on('closeScheduled', function (pollId) {
  var scheduleCloseStatus = document.getElementById(pollId + '-schedule-close-status');

  if (scheduleCloseStatus) {
    scheduleCloseStatus.innerText = 'Schedule Set!';
  }
});

socket.on('commentAdded', function (commentData) {
  var commentsDiv = document.getElementById(commentData.pollId + '-comments');

  if (commentsDiv) {
    var pNode = document.createElement('p');
    var emNode = document.createElement('em');
    var commentText = document.createTextNode(commentData.comment);
    emNode.appendChild(commentText);
    pNode.appendChild(emNode)
    commentsDiv.appendChild(pNode);
  }
});
