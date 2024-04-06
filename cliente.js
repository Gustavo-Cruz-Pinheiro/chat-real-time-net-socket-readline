const net = require('net');
const readline = require('readline');

const port = 3001;
const host = 'localhost';

const client = new net.Socket();

client.connect(port, host, () => {
  console.log(`Conectado ao servidor ${host}:${port}`)
  console.log(`Bem-vindo ao meu chat!`)

  console.log(`Digite uma mensagem: \n`)

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: '>'
  });

  rl.on('line', (message) => {
    client.write(message);
  });

  client.on('data', (data) => {
    console.log(data.toString());
  });

  client.on('close', () => {
    console.log('Conexão com o servidor fechada');
    process.exit(0);
  });
});

client.on('error', (err) => {
  console.error(`Erro de conexão: ${err.message}`);
  process.exit(1);
});
