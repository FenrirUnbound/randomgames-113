var statusPlugin = {
    register: function (server, options, next) {
        server.route({
            method: 'GET',
            path: '/api/status',
            handler: function (request, reply) {
                reply({status: 'OK'});
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