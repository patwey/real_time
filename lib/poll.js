const generateId = require('./generate-id');

function Poll (data) {
  this.id = generateId();
  this.title = data.title;
  this.options = data.options;
  this.initializeVoteCount(this.options);
}

Poll.prototype = {
  update: function(votes) {
    this.initializeVoteCount(this.options);
    for (var vote in votes) {
      this.voteCount[votes[vote]] ++;
    };
    return this;
  },

  initializeVoteCount: function(options) {
    this.voteCount = {};
    for (var i = 0; i < options.length; i++) {
      this.voteCount[options[i]] = 0;
    };
  }
}

module.exports = Poll;
