const generateId = require('./generate-id');

var Poll = function(data) {
  this.id = generateId();
  this.title = data.title;
  this.options = data.options;
}

module.exports = Poll;
