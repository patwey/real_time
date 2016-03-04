const generateId = require('./generate-id');

function Poll (data) {
  this.id = generateId();
  this.title = data.title;
  this.options = data.options;
}

Poll.prototype = {
  update: function(option) {
    this.options[option]++;
    return this;
  }
}

module.exports = Poll;
