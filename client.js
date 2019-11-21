const net = require('net')
let ipDestino = $('#ipText')
const renderer = require('renderer.js')

const client = new net.Socket()

$('#connection_button').mouseup(() => {
    client.connect(1337, ipDestino.val(), () => {(
        console.log('Connected to: ' + ipDestino.val()))
        $('#ipText').css('color', 'green')
    })
})


client.on('data', (data) => {
	console.log('Received from server: ' + data)
})

$('#send_button').mouseup(() => {
    client.write(renderer['codedMessage'])
})

client.on('close', () => {
    console.log('Connection closed!')
    $('#ipText').css('color', 'red');
})