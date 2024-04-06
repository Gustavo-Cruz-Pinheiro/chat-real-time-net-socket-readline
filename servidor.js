const net = require('net');
const readline = require('readline');

const port = 3001;

const server = net.createServer();

server.on('connection', (socket) => {
  console.log('Cliente conectado');
  console.log(`Bem-vindo ao meu chat!`)

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: '>'
  });

  rl.on('line', (message) => {
    socket.write(`Servidor diz: ${message}\n`);
  });

  socket.on('data', (data) => {
    console.log('Cliente diz:', data.toString());
  });

  socket.on('end', () => {
    console.log('Cliente desconectado');
  });

  rl.prompt();
});

server.listen(port, () => {
  console.log(`Servidor de chat iniciado na porta ${port}`);
});