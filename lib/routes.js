var statusPlugin = require('./plugins/status');

module.exports = function (server, callback) {
    server.register([
        {
            register: statusPlugin,
            options: {}
        }
    ], {
        routes: {
            prefix: '/games'
        }
    }, callback);
}
