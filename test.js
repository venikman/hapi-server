const Hapi = require('hapi');
const test = require('ava');


const server = new Hapi.Server();

server.connection({
    port: 1337,
    host: '127.0.0.1'
});

// test('checking protocol', async t => {
//     server.start();
//     t.is(server.info.protocol, 'http')
// })

server.inject('/404', res => {
    test('checking 404 page', async t => {
        t.is(res.statusCode, 404)
    })
});
