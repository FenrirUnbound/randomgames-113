var expect = require('chai').expect,
    mockery = require('mockery');

describe('Status Route', function () {
    var server; 

    beforeEach(function (done) {
        var main;

        mockery.enable({
            useCleanCache: true,
            warnOnUnregistered: false
        });

        main = require('../../lib/server');
        server = main(done);
    });

    afterEach(function (done) {
        server.stop(function () {
            mockery.disable();
            done();
        });
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

    it('returns the status of everything', function (done) {
        server.inject({
            method: 'GET',
            url: '/games/status/all'
        }, function (response) {
            var data;
            expect(response.statusCode).to.equal(200);
            data = JSON.parse(response.payload);

            expect(data).to.deep.equal({
                api: 'OK'
            });
            done();
        });
    });
});
