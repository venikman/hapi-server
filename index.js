const Hapi =require('hapi');
const Blipp = require('blipp');


const server = new Hapi.Server();

server.connection({
    port : 1337,
    host : '127.0.0.1'
});
//routing 
server.route({
    method : 'GET',
    path : '/',
    handler : function (request, reply) {
        return reply(`Hello World\n ${request}`);
    }
});

server.route({
     method: '*',
     path: '/{p*}',
     handler: function(request, reply) {
         return reply('The page was not found').code(404);
     }
 });
// {
//     method : 'GET',
//     path : '/hello/{name}',
//     config : {
//         description : 'Return an object with hello message',
//         validate : {
//             params : {
//                 name : Joi.string().min(3).required()
//             }
//         },
//         pre : [],
//         handler : function (request, reply) {
//             const name = request.params.name;
//             return reply({ message : `Hello ${name}` });
//         },
//         cache : {
//             expiresIn : 3600000
//         }
//     }
// }


// extending 
server.ext('onRequest', function (request, reply) {
    console.log(`request received: ${request}.`);
    return reply.continue();
});
// register
server.register(Blipp, (err) => {
    if(err) {
        throw err;
    }
    // server start
    server.start((err) => {
        if(err) {
            throw err;
        }
        console.log(`Server running at ${server.info.uri}`);
    });
})


