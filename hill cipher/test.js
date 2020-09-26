var input = "abcd";
var darray = [];
for (elem in input) {
	for (var i = 0; i < 2; i++) {
		for (var j = 0; j < 2; j++) {
			darray[i][j] = elem;
		}
	}
}
