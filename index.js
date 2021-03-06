const Hapi = require('hapi');
const Blipp = require('blipp');
const Inert = require('inert');
const Path = require('path');
const Vision = require('vision');

const server = new Hapi.Server();

server.connection({
    port: 1337,
    host: '127.0.0.1'
});

server.register([Blipp, Inert, Vision], (err) => {
    server.views({
        engines: {
            handlebars: {
                module: require('handlebars')
            }
        },
        relativeTo: __dirname,
        path: Path.join(__dirname, 'public', 'templates'),
    });
    server.route({
        method: 'GET',
        path: '/',
        handler: (request, reply) => {
            return reply.view('index');
        }
    });
    server.route({
        method: 'GET',
        path: '/rainbow',
        handler: (request, reply) => {
            return reply.view('rainbow');
        }
    });
    //server static html and image files
    server.route({
        method: 'GET',
        path: '/{files*}',
        handler: {
            directory: {
                path: Path.join(__dirname, 'public', 'templates'),
                listing: false
            }
        }
    });
    server.ext('onRequest', function(request, reply) {
        console.log('request received');
        return reply.continue();
    });
    server.ext('onPostHandler', function(request, reply) {
        const response = request.response;
        if (response.isBoom && response.output.statusCode === 404) {
            return reply.file('./404.html').code(404);
        }
        return reply.continue();
    });


    server.start((err) => {
        console.log(`Server running at: ${JSON.stringify(server.info)}`);
    })
});
