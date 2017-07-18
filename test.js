const Hapi = require('hapi');
const test = require('ava');


const server = new Hapi.Server();

server.connection({
    port: 1337,
    host: '127.0.0.1'
});

test('checking protocol', async t => {
    server.start();
    t.is(server.info.protocol, 'http')
})
