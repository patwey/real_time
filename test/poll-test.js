const assert = require('assert');
const Poll = require('../lib/poll');

describe('Poll', () => {
  it('should exist', () => {
    assert(Poll);
  });

  it('has a title', () => {
    var pollData = { title: 'My poll', options: ['A', 'B'] };
    var poll = new Poll(pollData);

    assert.equal(poll.title, pollData.title);
  });

  it('has options', () => {
    var pollData = { title: 'My poll', options: ['A', 'B'] };
    var poll = new Poll(pollData);

    assert.equal(poll.options, pollData.options);
  });

  it('defaults to a status of open', () => {
    var pollData = { title: 'My poll', options: ['A', 'B'] };
    var poll = new Poll(pollData);

    assert.equal('open', poll.status);
  });

  it('can calculate its percentages', () => {
    var pollData = { title: 'My poll', options: ['A', 'B'] };
    var poll = new Poll(pollData);
    poll.calculatePercents();
    var expectedPercents = { A: 0, B: 0 };

    assert.equal(expectedPercents['A'], poll.percentages['A']);
    assert.equal(expectedPercents['B'], poll.percentages['B']);
  });

  it('knows an options percent of the total votes', () => {
    var pollData = { title: 'My poll', options: ['A', 'B'] };
    var poll = new Poll(pollData);
    poll.totalVotes = 1;
    poll.voteCount['A'] = 1;

    assert.equal(100, poll.percentOfTotal('A'));
  });

  it('can tally votes', () => {
    var pollData = { title: 'My poll', options: ['A', 'B'] };
    var poll = new Poll(pollData);
    var votes = ['A', 'A'];

    poll.tallyVotes(votes);

    assert.equal(2, poll.voteCount['A']);
    assert.equal(2, poll.totalVotes);
  });
});
