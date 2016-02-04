var redis = require('redis'),
    client = redis.createClient(process.env.REDIS_PORT, process.env.REDIS_HOST, {auth_pass: process.env.REDIS_PASS});

function get(keyname, callback) {
    client.get(keyname, function (error, data) {
        var result;

        if (error) {
            return callback(error);
        }

        try { 
            result = JSON.parse(data);
        } catch(e) {
            return callback(e);
        }

        callback(error, result);
    });
}

function getAsync(keyname) {
    return new Promise(function (resolve, reject) {
        get(keyname, function (error, data) {
            if (error) {
                return reject(error);
            }

            resolve(data);
        });
    });
}

function set(keyname, value, callback) {
    var expireTime = 60 * 60 * 24 * 7;

    client.set(keyname, JSON.stringify(value), 'EX', expireTime, callback);
}

function setAsync(keyname, value) {
    return new Promise(function (resolve, reject) {
        set(keyname, value, function (error) {
            if (error) {
                return reject(error);
            }

            resolve(value);
        });
    });
}

module.exports = {
    get: get,
    set: set,
    getAsync: getAsync,
    setAsync: setAsync
};