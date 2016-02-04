
function api(request, reply) {
    reply({
        status: 'OK'
    });
}

function all(request, reply) {
    reply({
        api: 'OK'
    });
}


module.exports = {
    all: all,
    api: api
};