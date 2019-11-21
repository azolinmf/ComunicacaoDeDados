// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process because
// `nodeIntegration` is turned off. Use `preload.js` to
// selectively enable features needed in the rendering
// process.

const layout = {
	yaxis: {
		range: [-3, 3],
		autorange:false,
		showgrid: false,
		nticks: 5
	},
	xaxis: {
		showgrid: false,
		showline: false
	}
	// margin: { t: 0 }
}

function switchTab(evt, tabName) {
    // Declare all variables
    var i, tabcontent, tablinks;
  
    // Get all elements with class="tabcontent" and hide them
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
  
    // Get all elements with class="tablinks" and remove the class "active"
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
  
    // Show the current tab, and add an "active" class to the button that opened the tab
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " active";
}

function fill_char(char) {
    unfilled = char.toString(2)
    return '0'.repeat(9-unfilled.length) + unfilled
}

var codedMessage
$('.inputs').bind('input propertychange', function() {
	const text = $('#message').val()

	const binary = text.split('').map(function (char) { return fill_char(char.charCodeAt(0)) }).join('');
	
	$('#binary_message').val(binary)

	const crypto_val = cripto(text, $('#password').val())
	$('#crypto_message').val(crypto_val)            // muda o campo
   
    codedMessage = twoBoneQ(crypto_val)
    Plotly.newPlot('graph', XYdata(codedMessage), layout)
})

module.exports.codedMessage = codedMessage

function cripto(text, password) {
    return text.split('').map(function (x,i) {return fill_char(x.charCodeAt(0) + password[i%password.length].charCodeAt(0))}).join('')
}

function uncripto(charList, password) {
    return charList.map(function (x,i) {return fill_char(parseInt(x,2) - password[i%password.length].charCodeAt(0))}).join('')
}

function twoBoneQ(message) {
	var prev = 1
	translate = {
		'00': 1,
		'01': 3,
		'10': -1,
		'11': -3
	}

	return message.match(/.{1,2}/g).map((x) => {
		result = prev*translate[x]
		prev = result > 0 ? 1 : -1
		return result
	})
}

function oneQtwoB(signal) {
	var prev = 1
	translate = {
		1: '00',
		3: '01',
		'-1': '10',
		'-3': '11',
	}
	return signal.map((x) => {
		result = translate[prev*x]
		prev = x > 0 ? 1 : -1
		return result
	})
}

function XYdata(binary) {
	var x = [0]
	var y = [binary[0]]
	var count = 0
	for (const bit of binary){
		if (bit != y.slice(-1)) {
			x.push(count)
			y.push(bit)
		}
		count += 1
		x.push(count)
		y.push(bit)
	}

	return [{x: x, y: y}]
}

function showMessage(data_received) {
	const codedMsg = data_received.toString()
    const mensagem = oneQtwoB(codedMsg)
    const charList = mensagem.match(/.{1,9}/g)

    $('#crypto_message_server').val(mensagem)

    const decriptedMessage = uncripto(charList, $('#passwordServer').val())
    $('#binary_message_server').val(decriptedMessage)

    const finalMessage = decriptedMessage.match(/.{1,9}/g).map((x) => String.fromCharCode(parseInt(x,2))).join('')
    $('#message_server').val(finalMessage)
    

    //Plotly.newPlot('graph_server', XYdata(twoBoneQ(crypto_val)), layout)
}

module.exports.showMessage = showMessage