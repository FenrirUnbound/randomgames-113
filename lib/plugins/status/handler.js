
function api(request, reply) {
    reply({
        status: 'OK'
    });
}

function all(request, reply) {
    var now = new Date().getTime() / 1000,
        my = this;

    my.datastore.setAsync('game.status.all', now)
    .then(function () {
        return my.datastore.getAsync('game.status.all');
    })
    .then(function (timestamp) {
        reply({
            api: 'OK',
            datastore: (timestamp === now) ? 'OK' : 'BAD'
        });
    });
}


module.exports = {
    all: all,
    api: api
};