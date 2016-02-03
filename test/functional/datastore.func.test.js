var envFile = require('node-env-file'),
    expect = require('chai').expect,
    path = require('path');

describe('Datastore Functional Tests', function () {
    var main;

    before(function () {
        var filepath = path.resolve(__dirname, '..', '..', '.env');
        envFile(filepath, {raise: false});
    });

    beforeEach(function () {
        main = require('../../lib/datastore');
    });

    it('sets and gets', function () {
        var now = new Date().getTime()/1000;

        return main.setAsync('test_datastore.func', now)
        .then(function () {
            return main.getAsync('test_datastore.func');
        })
        .then(function (data) {
            expect(data).to.equal(now);
        });
    });
});