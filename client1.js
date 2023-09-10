const WebSocket = require('ws');
const readline = require('readline');

const ip = 'ws://localhost:8080'; // Especifique o endereço IP aqui
const socket = new WebSocket(ip);

socket.on('open', () => {
  console.log('Cliente 1 conectado.');
  let msg = "";

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  // Função para enviar mensagens
  function sendMessage() {
    rl.question('', (message) => {
      if (message.toLowerCase() === 'exit') {
        rl.close();
        socket.close();
      } else {
        socket.send(message);
        msg = message;
        sendMessage(); // Chama a função novamente para enviar mais mensagens
      }
    });
  }

  sendMessage(); // Inicia o ciclo de envio de mensagens

  socket.on('message', (message) => {
    console.log(`Mensagem recebida: ${message}`);
  });
});

socket.on('close', () => {
  console.log('Cliente 1 desconectado.');
});
