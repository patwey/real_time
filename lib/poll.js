const generateId = require('./generate-id');

function Poll (data) {
  this.voteCount = {};
  this.totalVotes = 0;
  this.percentages = {};
  
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
      this.totalVotes++;
    };

    this.calculatePercents();

    return this;
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
