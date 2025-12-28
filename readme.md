# gRPC Node.js Demo ✅

A small, easy-to-follow repository that demonstrates a simple gRPC server and client implemented in Node.js using `@grpc/grpc-js` and `@grpc/proto-loader`.

This repo contains two example projects:

- `gRPC_Node_DEmo` — a **Todo gRPC server** that listens on port `50051` and keeps an in-memory list of todos.
- `node_Client_gRPC` — a **gRPC client** that connects to the server, lists todos, creates one, and lists again.

---

## Contents 📁

```
readme.md
gRPC_Node_DEmo/
  ├─ index.js      # gRPC server
  ├─ package.json
  └─ todo.proto    # Service + messages
node_Client_gRPC/
  ├─ index.js      # gRPC client
  ├─ package.json
  └─ todo.proto    # Same proto used by the client
```

---

## Prerequisites ⚙️

- Node.js (recommended: **v16+**). Verify with:

```powershell
node -v
npm -v
```

- An internet connection to fetch npm packages.

Optional tools for debugging / inspection:

- `grpcurl` (useful for calling gRPC services from CLI)

---

## Proto overview (what's defined) 🧭

The `todo.proto` defines a `TodoService` with three RPC methods:

- `CreateTodo (Todo) returns (Todo)` — add a todo and return it
- `GetTodo (TodoRequest) returns (Todo)` — fetch a todo by `id`
- `ListTodos (Empty) returns (TodoList)` — list all todos

Messages:

- `Todo` — `{ id, title, content }`
- `TodoList` — `{ repeated Todo todos }`
- `TodoRequest` — `{ id }`

Both server and client use the same proto files located in their folders.

---

## Setup & Run (Windows / PowerShell) ▶️

### 1) Start the gRPC server

Open a terminal and run:

```powershell
cd gRPC_Node_DEmo
npm install
node index.js
```

You should see:

```
🚀 gRPC server started on port 50051
```

> Note: the server stores todos in memory (an array). Restarting the server resets the list.


### 2) Run the client

Open another terminal and run:

```powershell
cd node_Client_gRPC
npm install
node index.js
```

Expected behaviour from the client:

- It calls `listTodos` and prints the list (initial content from server).
- It calls `createTodo` to add a new todo.
- It calls `listTodos` again to show the new item.

Example console output (client):

```
before insertion: [ { id: '1', title: 'Todo1', content: 'Content of todo 1' }, { id: '2', title: 'Todo2', content: 'Content of todo 2' } ]
created a new todo
after insertion: [ { id: '1', ... }, { id: '2', ... }, { id: '3', title: 'third todo', content: 'yoo' } ]
```

---

## Key implementation details 🔧

- Server (`gRPC_Node_DEmo/index.js`):
  - Uses `@grpc/grpc-js` and `@grpc/proto-loader` to load `todo.proto` and expose RPC methods.
  - Keeps an in-memory `todos` array with example items.
  - Implements `listTodos`, `createTodo`, and `getTodo`.

- Client (`node_Client_gRPC/index.js`):
  - Loads `todo.proto` and creates a `TodoService` client pointing at `127.0.0.1:50051`.
  - Demonstrates calling `listTodos` and `createTodo` with callbacks.

---

## Troubleshooting & Tips ⚠️

- "Address in use" when starting the server: another process is using port `50051`. Stop it or change the server port in `index.js`.
- Make sure you run the **server first** before starting the client.
- If you see `UNAVAILABLE` or connection errors from the client, check firewall settings and confirm the server is listening on `127.0.0.1:50051`.

---

## Suggestions / Next steps 💡

- Add npm `start` scripts to both `package.json` files for convenience: `"start": "node index.js"`.
- Add tests and TypeScript types for better DX and safety.
- Persist todos in a database instead of keeping them in memory.
- Add more client examples (e.g., using Promises / async/await wrappers or `grpc-js` with generated stubs).

---

## Contributing 🤝

Feel free to open issues or PRs. Keep changes small and test that the server and client run locally before submitting.

---

## License

MIT — free to use and modify.

---

If you'd like, I can also add `npm start` scripts to both subprojects and a short test script — say the word and I will implement it. 🚀