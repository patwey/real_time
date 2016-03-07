const assert = require('assert');
const app = require('../server');
const request = require('request');
const fixtures = require('./fixtures');

describe('Server', () => {
  before(done => {
    this.port = 9876;

    this.server = app.listen(this.port, (err, result) => {
    if (err) { return done(err); }
    done();
    });

    this.request = request.defaults({
      baseUrl: 'http://localhost:9876/'
    });
  });

  after(() => {
    this.server.close();
  });

  it('should exist', () => {
    assert(app);
  });

  describe('GET /', () => {

    it('should return a 200', (done) => {
      this.request.get('/', (error, response) => {
        if (error) { done(error); }
        assert.equal(response.statusCode, 200);
        done();
      });
    });
  });

  describe('POST /new', () => {
    beforeEach(() => {
      app.locals.polls = {};
    });

    it('should receive and store data', (done) => {
      var payload = { poll: fixtures.validPoll };

      this.request.post('/new', { form: payload }, (error, response) => {
        if (error) { done(error); }

        var pollCount = Object.keys(app.locals.polls).length;

        assert.equal(pollCount, 1, `Expected 1 poll, found ${pollCount}`);
        done();
      });
    });

    it('should redirect the user to the admin page for their poll', (done) => {
      var payload = { poll: fixtures.validPoll };

      this.request.post('/new', { form: payload }, (error, response) => {
        if (error) { done(error); }
        var newPollId = Object.keys(app.locals.polls)[0];
        assert.equal(response.headers.location, '/admin/polls/' + newPollId);
        done();
      });
    });
  });

  describe('GET /polls/:id', () => {

    beforeEach(() => {
      app.locals.polls = {};
      app.locals.polls[fixtures.validPoll.id] = fixtures.validPoll;
    });

    it('should not return 404', (done) => {
      this.request.get('/polls/' + fixtures.validPoll.id, (error, response) => {
        if (error) { done(error); }
        assert.notEqual(response.statusCode, 404);
        done();
      });
    });
  });

  describe('GET /admin/polls/:id', () => {

    beforeEach(() => {
      app.locals.polls = {};
      app.locals.polls[fixtures.validPoll.id] = fixtures.validPoll;
    });

    it('should not return 404', (done) => {
      this.request.get('/admin/polls/' + fixtures.validPoll.id, (error, response) => {
        if (error) { done(error); }
        assert.notEqual(response.statusCode, 404);
        done();
      });
    });
  });
});
