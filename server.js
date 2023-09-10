const WebSocket = require('ws');

const server = new WebSocket.Server({ port: 8080 });

const clients = new Set();

server.on('connection', (socket) => {
  clients.add(socket);

  socket.on('message', (message) => {
    // Broadcast a message to all connected clients
    for (const client of clients) {
      if (client !== socket && client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    }
  });

  socket.on('close', () => {
    clients.delete(socket);
  });
});

console.log('WebSocket server is running on port 8080');