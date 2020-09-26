const plaintext = document.getElementById("plaintext");
const ekey = document.getElementById("ekey");
const alphabets = "abcdefghijklmnopqrstuvwxyz";
const encryptButton = document.getElementById("encrypt");
const decryptButton = document.getElementById("decrypt");
const output = document.getElementById("output");
function encrypt() {
	var numberkey = ekey.value.split(",").map((element) => {
		return alphabets.indexOf(element) > -1
			? alphabets.indexOf(element)
			: parseInt(element);
	});
	var plaintextNumber = plaintext.value
		.toLowerCase()
		.split("")
		.map((element) => {
			return alphabets.indexOf(element);
		});
	console.log(plaintextNumber);
	var keyMatrics = new Array(plaintextNumber.length);
	for (let i = 0; i < keyMatrics.length; i++) {
		keyMatrics[i] = new Array(plaintextNumber.length);
	}
	var count = 0;
	for (let i = 0; i < plaintextNumber.length; i++) {
		for (let j = 0; j < plaintextNumber.length; j++) {
			keyMatrics[i][j] = numberkey[count++];
		}
	}
	console.log(keyMatrics);

	var ciphertextNumber = keyMatrics.map((keyRow) => {
		sum = 0;
		for (let i = 0; i < plaintextNumber.length; i++) {
			sum = (sum + keyRow[i] * plaintextNumber[i]) % 26;
		}
		return sum;
	});
	var cipherTextArray = ciphertextNumber.map((elm) => {
		return alphabets[elm];
	});
	var cipherText = cipherTextArray.join("").toUpperCase();

	console.log(ciphertextNumber, cipherText);
	output.innerText = cipherText;
}
function decrypt() {
	var numberkey = ekey.value.split(",").map((element) => {
		return alphabets.indexOf(element) > -1
			? alphabets.indexOf(element)
			: parseInt(element);
	});
	var plaintextNumber = plaintext.value
		.toLowerCase()
		.split("")
		.map((element) => {
			return alphabets.indexOf(element);
		});
	console.log(plaintextNumber);
	var keyMatrics = new Array(plaintextNumber.length);
	for (let i = 0; i < keyMatrics.length; i++) {
		keyMatrics[i] = new Array(plaintextNumber.length);
	}
	var count = 0;
	for (let i = 0; i < plaintextNumber.length; i++) {
		for (let j = 0; j < plaintextNumber.length; j++) {
			keyMatrics[i][j] = numberkey[count++];
		}
	}

	var determinant =
		keyMatrics[1][1] * keyMatrics[0][0] - keyMatrics[1][0] * keyMatrics[0][1] <
		0
			? -(
					keyMatrics[1][1] * keyMatrics[0][0] -
					keyMatrics[1][0] * keyMatrics[0][1]
			  )
			: keyMatrics[1][1] * keyMatrics[0][0] -
			  keyMatrics[1][0] * keyMatrics[0][1];

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
	console.log(keyMatricsInverse);

	ciphertextNumber = keyMatricsInverse.map((keyRow) => {
		let sum = 0;
		for (let i = 0; i < plaintextNumber.length; i++) {
			sum = (sum + keyRow[i] * plaintextNumber[i]) % 26;
		}
		return sum;
	});
	var cipherTextArray = ciphertextNumber.map((elm) => {
		return alphabets[elm];
	});
	var cipherText = cipherTextArray.join("").toUpperCase();

	console.log(ciphertextNumber, cipherText);
	output.innerText = cipherText;
}

decryptButton.addEventListener("click", decrypt);
encryptButton.addEventListener("click", encrypt);
