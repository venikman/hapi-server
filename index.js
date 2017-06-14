const Hapi =require('hapi');
const Blipp = require('blipp');
const Inert = require('inert');
const Path = require('path');

const server = new Hapi.Server();

server.connection({
    port : 1337,
    host : '127.0.0.1'
});

server.register(Inert, (err) => {

    //server static html and image files
    server.route({
        method: 'GET',
        path: '/{files*}',
        handler: {
            directory: {
                path: Path.join( __dirname, 'public'),
                listing: true
            }
        }
    });

});

server.register(Blipp);

    // extending 
    server.ext('onRequest', function (request, reply) {
        console.log('request received');
        return reply.continue();
    });
    server.ext('onPostHandler', function (request, reply) {
        const response = request.response;
        if (response.isBoom && response.output.statusCode === 404) {
            return reply.file('./404.html').code(404);
        }
        return reply.continue();
    });


    server.start((err) => {
        console.log(`Server running at: ${server.info.uri}`);
    })
// });




