var handler = require('./handler'),
    statusPlugin = {
    register: function (server, options, next) {
        server.route({
            method: 'GET',
            path: '/status/api',
            handler: handler.api
        });
        server.route({
            method: 'GET',
            path: '/status/all',
            handler: handler.all,
            config: {
                bind: {
                    datastore: options.datastore
                }
            }
        });

        next();
    }
};

statusPlugin.register.attributes = {
    name: 'simpleStatusPlugin',
    version: '1.0.0'
};

module.exports = statusPlugin;