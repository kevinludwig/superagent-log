const request = require('superagent'),
      chai = require('chai'),
      nock = require('nock'),
      saLog = require('../');

const should = chai.should();

describe('superagent log', () => {
    it('should call log with params', async () => {
        nock('https://github.com')
            .get('/something')
            .reply(500);

        function logFn(obj) {
            obj.protocol.should.be.eql('HTTPS');
            obj.method.should.be.eql('GET');
            obj.href.should.be.eql('https://github.com/something');
            obj.status.should.be.eql(500);
            should.exist(obj.elapsed);
        }

        await request.get('https://github.com/something').query({a: 1}).use(saLog(logFn));
    });
});
