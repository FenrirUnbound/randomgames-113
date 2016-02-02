var async = require('async'),
    hapi = require('hapi'),
    routes = require('./routes'),
    server = new hapi.Server();
server.connection({port: process.env.PORT || 8080});


function startServer(callback) {
    server.start(function () {
        console.log('Server running at: ' + server.info.uri);

        if (callback) {
            callback();
        }
    });
}


module.exports = function (callback) {
    var me = this;

    async.series([
        routes.bind(me, server),
        startServer.bind(me)
    ], callback);

    return server;
};