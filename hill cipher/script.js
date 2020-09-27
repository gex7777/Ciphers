const plaintext = document.getElementById("plaintext");
const ekey = document.getElementById("ekey");
const alphabets = "abcdefghijklmnopqrstuvwxyz";
const encryptButton = document.getElementById("encrypt");
const decryptButton = document.getElementById("decrypt");
const output = document.getElementById("output");
function create2dArray(array) {
	let n = array.length / 2;
	let Matrics = new Array(n);
	for (let i = 0; i < Matrics.length; i++) {
		Matrics[i] = new Array(2);
	}
	let count = 0;
	for (let i = 0; i < n; i++) {
		for (let j = 0; j < 2; j++) {
			Matrics[i][j] = array[count++];
		}
	}
	return Matrics.slice();
}
function encrypt() {
	var key = ekey.value.split(",").map((element) => {
		return alphabets.indexOf(element) > -1
			? alphabets.indexOf(element)
			: parseInt(element);
	});
	var messageNumber = plaintext.value
		.toLowerCase()
		.split("")
		.map((element) => {
			return alphabets.indexOf(element);
		});
	console.log(messageNumber);
	var keyMatrics = create2dArray(key);
	var messageMatrics = create2dArray(messageNumber);
	console.log(keyMatrics, messageMatrics);

	console.log(keyMatrics);
	var outputNumber = messageMatrics.map((messageRow) => {
		return keyMatrics.map((keyRow) => {
			var sum = 0;
			for (let i = 0; i < 2; i++) {
				console.log(messageRow[i], keyRow[i]);
				sum = (sum + messageRow[i] * keyRow[i]) % 26;
				console.log(sum);
			}
			console.log(sum);
			return sum;
		});
	});
	outputNumber = [].concat(...outputNumber);

	var outputArray = outputNumber.map((number) => {
		return alphabets[number];
	});
	var cipherText = outputArray.join("").toUpperCase();

	console.log(outputNumber, cipherText);
	output.innerText = cipherText;
}
function decrypt() {
	var key = ekey.value.split(",").map((element) => {
		return alphabets.indexOf(element) > -1
			? alphabets.indexOf(element)
			: parseInt(element);
	});
	var messageNumber = plaintext.value
		.toLowerCase()
		.split("")
		.map((element) => {
			return alphabets.indexOf(element);
		});
	var messageMatrics = create2dArray(messageNumber);
	var keyMatrics = create2dArray(key);
	var determin =
		keyMatrics[1][1] * keyMatrics[0][0] - keyMatrics[1][0] * keyMatrics[0][1];
	var determinant = determin < 0 ? -determin : determin;

	var transpose = keyMatrics.map((arr) => {
		return arr.slice();
	});
	var temp = transpose[1][1];
	transpose[1][1] = transpose[0][0];
	transpose[0][0] = temp;
	transpose[0][1] = -transpose[0][1] + 26;
	transpose[1][0] = -transpose[1][0] + 26;
	var determinantMI = 0;

	for (var i = 1; i < 26; i++) {
		if ((determinant * i) % 26 == 1) {
			determinantMI = i;
		}
	}
	console.log(transpose, determinantMI);
	var keyMatricsInverse = transpose.map((array) => {
		return array.map((elm) => {
			return (elm * determinantMI) % 26;
		});
	});
	console.log(keyMatricsInverse, messageMatrics);
	var outputArray = messageMatrics.map((messageRow) => {
		return keyMatricsInverse.map((keyRow) => {
			let sum = 0;
			for (let i = 0; i < 2; i++) {
				sum = (sum + keyRow[i] * messageRow[i]) % 26;
			}
			console.log(sum);
			return sum;
		});
	});
	outputArray = [].concat(...outputArray);
	var outputTextArray = outputArray.map((elm) => {
		return alphabets[elm];
	});
	var outputText = outputTextArray.join("").toUpperCase();
	output.innerText = outputText;
}

decryptButton.addEventListener("click", decrypt);
encryptButton.addEventListener("click", encrypt);
