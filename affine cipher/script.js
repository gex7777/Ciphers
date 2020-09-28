const textElm = document.getElementById("text");
const alphaElm = document.getElementById("alpha");
const betaElm = document.getElementById("beta");
const encryptButton = document.getElementById("encrypt");
const decryptButton = document.getElementById("decrypt");
const alphabets = "abcdefghijklmnopqrstuvwxyz";
const outputElm = document.getElementById("output");
function encrypt() {
	//get values from dom
	var textArray = textElm.value.split("");
	var alpha = parseInt(alphaElm.value); //convert text values to number before assigning
	var beta = parseInt(betaElm.value);
	//convert textArray to numbers
	var textNumberArray = textArray.map((elm) => {
		elm=elm.toLowerCase();
		return alphabets.indexOf(elm);
	});
	console.log(textNumberArray);
	//affine enryption
	var output = textNumberArray.map((elm) => {
		console.log(elm, alpha, beta);
		return (elm * alpha + beta) % 26;
	});
	output = output.map((elm) => {
		return alphabets[elm];
	});
	output = output.join("").toUpperCase();
	outputElm.innerText = output;
}

function decrypt() {
	//get values from dom
	var textArray = textElm.value.split("");
	var alpha = parseInt(alphaElm.value); //convert text values to number before assigning
	var beta = parseInt(betaElm.value);
	//convert textArray to numbers
	var textNumberArray = textArray.map((elm) => {
		return alphabets.indexOf(elm);
	});
	console.log(textNumberArray);
	var alphaMI = 0;
	for (var i = 1; i < 26; i++) {
		if ((alpha * i) % 26 == 1) {
			alphaMI = i;
		}
	}
	//affine deryption
	var output = textNumberArray.map((elm) => {
		console.log(elm, alpha, alphaMI, beta);
		return (alphaMI * (elm - beta)) % 26;
	});
	output = output.map((elm) => {
		return alphabets[elm];
	});
	output = output.join("").toUpperCase();
	outputElm.innerText = output;
}

encryptButton.addEventListener("click", encrypt);
decryptButton.addEventListener("click", decrypt);
