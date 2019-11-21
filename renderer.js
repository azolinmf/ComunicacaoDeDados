// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process because
// `nodeIntegration` is turned off. Use `preload.js` to
// selectively enable features needed in the rendering
// process.

const layout = {
	yaxis: {
		range: [-1, 1],
		autorange:false,
		showgrid: false,
		nticks: 3
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

$('.inputs').bind('input propertychange', function() {
	const text = $('#message').val()

	const binary = text.split('').map(function (char) { return fill_char(char.charCodeAt(0)) }).join('');
	
	$('#binary_message').val(binary)

	const crypto_val = cripto(text, $('#password').val())
	$('#crypto_message').val(crypto_val)            // muda o campo
   
    Plotly.newPlot('graph', XYdata(crypto_val), layout)
})

function cripto(text, password) {
    return text.split('').map(function (x,i) {return (x.charCodeAt(0) + password[i%password.length].charCodeAt(0)).toString(2)}).join('')
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

