var expect = require('chai').expect;

describe('Status Route', function () {
    var server; 

    beforeEach(function (done) {
        var main = require('../../lib/server');
        server = main(done);
    });

    afterEach(function (done) {
        server.stop(done);
    });

    it('returns the status', function (done) {
        server.inject({
            method: 'GET',
            url: '/games/status/api'
        }, function (response) {
            var data;
            expect(response.statusCode).to.equal(200);
            data = JSON.parse(response.payload);

            expect(data).to.deep.equal({
                status: 'OK'
            });
            done();
        });
    });
});