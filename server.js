const __net = require('net')
let mensagem
let renderer_ = require('./renderer.js')

const server = __net.createServer()

server.on('connection', (socket) => {
	socket.write('Echo server\r\n')
	
	socket.on('data', (data) => {
		mensagem = data
		console.log('Received from client: ' + mensagem)

        renderer_.showMessage(mensagem.toString().split(','))
	})
})

server.listen(1337)