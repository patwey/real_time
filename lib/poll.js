const generateId = require('./generate-id');

function Poll (data) {
  this.comments = data.comments || {};
  this.voteCount = data.voteCount || {};
  this.totalVotes = 0;
  this.percentages = data.percentages || {};
  this.status = data.status || 'open';
  this.resultsVisibility = data.resultsVisibility || 'hidden';

  this.id = data.id || generateId();
  this.title = data.title;
  this.options = data.options;
  this.initializeVoteCount(this.options);
}

Poll.prototype = {
  update: function(votes) {
    this.initializeVoteCount(this.options);
    this.tallyVotes(votes);
    this.calculatePercents();

    return this;
  },

  tallyVotes: function(votes) {
    for (var vote in votes) {
      this.voteCount[votes[vote]] ++;
      this.totalVotes++;
    };
  },

  initializeVoteCount: function(options) {
    for (var i = 0; i < options.length; i++) {
      this.voteCount[options[i]] = 0;
    };

    this.calculatePercents();
  },

  calculatePercents: function () {
    var options = this.options;

    for (var option in options) {
      this.percentages[options[option]] = this.percentOfTotal(options[option]);
    }
  },

  percentOfTotal: function(option) {
    return Math.round(this.voteCount[option] / this.totalVotes * 100) || 0;
  }
}

module.exports = Poll;
