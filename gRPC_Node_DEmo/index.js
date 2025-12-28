const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');

const packageDefinition = protoLoader.loadSync('./todo.proto', {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true
});

const protoDescriptor = grpc.loadPackageDefinition(packageDefinition);
const todoService = protoDescriptor.TodoService;

const server = new grpc.Server();

const todos = [
    { id: '1', title: 'Todo1', content: 'Content of todo 1' },
    { id: '2', title: 'Todo2', content: 'Content of todo 2' }
];

server.addService(todoService.service, {
    listTodos: (call, callback) => {
        callback(null, { todos });
    },

    createTodo: (call, callback) => {
        todos.push(call.request);
        console.log(todos);
        
        callback(null, call.request);
    },

    getTodo: (call, callback) => {
        const todo = todos.find(t => t.id === call.request.id);
        if (todo) {
            callback(null, todo);
        } else {
            callback({
                code: grpc.status.NOT_FOUND,
                message: 'Todo not found',
            });
        }
    }
});

server.bindAsync(
    '0.0.0.0:50051',
    grpc.ServerCredentials.createInsecure(),
    () => {
        console.log('🚀 gRPC server started on port 50051');
        server.start();
    }
);
