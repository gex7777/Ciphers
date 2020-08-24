const textarea = document.getElementById("textarea");
const key = document.getElementById("key");
const output = document.getElementById("output");
const alphabats = "abcdefghijklmnopqrstuvwxyz";
function getVal() {
	var keyvalue = +key.value % 26;

	var result = " ";
	var text = textarea.value;

	for (let c of text) {
		result = result + alphabats[(+alphabats.indexOf(c) + keyvalue) % 26];
	}
	output.innerHTML = result;
}
textarea.addEventListener("input", getVal);
key.addEventListener("input", getVal);
