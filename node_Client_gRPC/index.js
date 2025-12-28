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
const TodoService = protoDescriptor.TodoService;

const client = new TodoService(
    '127.0.0.1:50051',
    grpc.credentials.createInsecure()
);


client.listTodos({}, (err, response) => {
    if (err) {
        console.error('List error:', err);
        return;
    }

    console.log('before insertion:', response.todos);

    client.createTodo({ id: '3', title: 'third todo', content: 'yoo' },(err) => {
            if (err) {
                console.error('Create error:', err);
                return;
            }

            console.log('created a new todo');

            client.listTodos({}, (err, response) => {
                if (err) {
                    console.error('List error:', err);
                    return;
                }

                console.log('after insertion:', response.todos);
            });
        }
    );
});

