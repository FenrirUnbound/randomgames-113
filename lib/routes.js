var datastore = require('./datastore'),
    statusPlugin = require('./plugins/status');

module.exports = function (server, callback) {
    server.register([
        {
            register: statusPlugin,
            options: {
                datastore: datastore
            }
        }
    ], {
        routes: {
            prefix: '/games'
        }
    }, callback);
}
