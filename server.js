const __net = require('net')
let mensagem
let renderer = require('./renderer.js')

const server = __net.createServer()

server.on('connection', (socket) => {
	socket.write('Echo server\r\n')
	
	socket.on('data', (data) => {
		mensagem = data
		console.log('Received from client: ' + mensagem)

        renderer.showMessage(mensagem)
	})
})

server.listen(1337)