var chai = require('chai'),
    expect = chai.expect,
    mockery = require('mockery'),
    sinon = require('sinon');

chai.use(require('sinon-chai'));

describe('Datastore Unit Tests', function () {
    var envMock,
        main,
        redisClientMock,
        redisMock,
        sandbox;

    beforeEach(function () {
        mockery.enable({
            useCleanCache: true,
            warnOnUnregistered: false
        });
        sandbox = sinon.sandbox.create();

        envMock = {
            REDIS_HOST: 'redisHost',
            REDIS_PORT: 'redisPort',
            REDIS_PASS: 'redisPass'
        };
        sandbox.stub(process, 'env', envMock);

        redisClientMock = {
            get: sinon.stub(),
            set: sinon.stub()
        };

        redisMock = {
            createClient: sinon.stub().returns(redisClientMock)
        };
        mockery.registerMock('redis', redisMock);

        main = require('../../lib/datastore');
    });

    afterEach(function () {
        sandbox.restore();
        mockery.deregisterAll();
        mockery.disable();
    });

    it('starts', function () {
        expect(redisMock.createClient).to.have.been.calledWith('redisPort', 'redisHost', {auth_pass: 'redisPass'});
    });

    describe('get', function () {
        it('gets data', function (done) {
            redisClientMock.get.withArgs('gameName.randomKey').yieldsAsync(null, '"realData"');

            main.get('gameName.randomKey', function (err, data) {
                expect(data).to.equal('realData');
                done();
            });
        });

        it('returns an error when encountered', function (done) {
            var testError = new Error('redisClientGetError');
            redisClientMock.get.withArgs('gameName.key').yieldsAsync(testError);

            main.get('gameName.key', function (error) {
                expect(error).to.be.ok;
                expect(error.message).to.equal('redisClientGetError');
                done();
            });
        });

        it('returns an error while parsing JSON', function (done) {
            redisClientMock.get.withArgs('name.key').yieldsAsync(null, 'realData'); 

            main.get('name.key', function (error, data) {
                expect(error.message).to.equal('Unexpected token r')
                done();
            });
        });
    });

    describe('getAsync', function () {
        it('promises to get data', function () {
            redisClientMock.get.withArgs('game.key').yieldsAsync(null, '"realData"');

            return main.getAsync('game.key')
            .then(function (data) {
                expect(data).to.equal('realData');
            });
        });

        it('promises to throw an error', function () {
            var testError = new Error('getAsyncError');
            redisClientMock.get.yieldsAsync(testError);

            return main.getAsync('game.key')
            .then(function () {
                throw new Error('Error not thrown');
            })
            .catch(function (error) {
                expect(error.message).to.equal('getAsyncError');
            });
        });
    });

    describe('set', function () {
        it('sets the data', function (done) {
            redisClientMock.set.withArgs('gameName.key', '{"legend":"dairy"}', 'EX', 604800).yieldsAsync(null);

            main.set('gameName.key', {legend: 'dairy'}, done);
        });

        it('returns an error when encountered', function (done) {
            var testError = new Error('setError');
            redisClientMock.set.yieldsAsync(testError);

            main.set('game.key', 'value', function (error) {
                expect(error).to.be.ok;
                expect(error.message).to.equal('setError');
                done();
            });
        });
    });

    describe('setAsync', function () {
        it('promises to set the data', function () {
            redisClientMock.set.withArgs('gameName.key', '{"legend":"dairy"}', 'EX', 604800).yieldsAsync(null);

            return main.setAsync('gameName.key', {legend: 'dairy'})
            .then(function (data) {
                expect(data).to.deep.equal({
                    legend: 'dairy'
                });
            });
        });

        it('rejects to set the data', function () {
            var testError = new Error('setAsyncError');
            redisClientMock.set.yieldsAsync(testError);

            return main.setAsync('name.key', 'value')
            .then(function () {
                throw new Error('error not thrown');
            })
            .catch(function (error) {
                expect(error.message).to.equal('setAsyncError');
            });
        });
    });
});