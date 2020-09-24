const plaintext = document.getElementById("plaintext");
const ekey = document.getElementById("ekey");
const ciphertext = document.getElementById("ciphertext");
const dkey = document.getElementById("dkey");
const alphabats = "abcdefghijklmnopqrstuvwxyz";
function enCrypt() {
	var keyvalue = +ekey.value % 26;

	var result = "";
	var text = plaintext.value;

	for (let c of text) {
		result = result + alphabats[(+alphabats.indexOf(c) + keyvalue) % 26];
	}
	dkey.value = 26 - keyvalue;
	ciphertext.value = result;
}
function deCrypt() {
	var keyvalue = dkey.value % 26;
	var result = "";
	var text = ciphertext.value;

	for (let c of text) {
		result = result + alphabats[(+alphabats.indexOf(c) + keyvalue) % 26];
	}
	ekey.value = 26 - keyvalue;
	plaintext.value = result;
}
ciphertext.addEventListener("input", deCrypt);
plaintext.addEventListener("input", enCrypt);
dkey.addEventListener("input", deCrypt);
ekey.addEventListener("input", enCrypt);
