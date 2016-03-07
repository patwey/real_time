const assert = require('assert');
const SanitizePollData = require('../lib/sanitize-poll-data');

describe('SanitizePollData', () => {
  it('should exist', () => {
    assert(SanitizePollData);
  });

  it('handles empty raw data', () => {
    var rawData = {};
    var sanitizedData = SanitizePollData(rawData);

    assert.equal('', sanitizedData.title);
    assert.equal(0, sanitizedData.options.length);
  });

  it('handles raw data with a single option', () => {
    var rawData = { options: 'Hi' };
    var sanitizedData = SanitizePollData(rawData);

    assert.equal(1, sanitizedData.options.length);
  });

  it('handles raw data with multiple options', () => {
    var rawData = { options: ['Hi', 'Howdy'] };
    var sanitizedData = SanitizePollData(rawData);

    assert.equal(2, sanitizedData.options.length);
  });

  it('handles raw data a title', () => {
    var rawData = { title: 'My Poll' };
    var sanitizedData = SanitizePollData(rawData);

    assert.equal('My Poll', sanitizedData.title);
  });
});
