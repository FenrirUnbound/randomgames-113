var statusPlugin = require('./plugins/status');

module.exports = function (server, callback) {
    server.register([
        statusPlugin
    ], callback);
}
