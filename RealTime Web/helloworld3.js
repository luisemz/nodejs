function readFile(filename) {
	var sq = ASQ();
	fs.readFile(filename, sq.errfcb());

	return sq;
}

function delayMsg(done, contents) {
	setTimeout(function() {
		done(contents);
	});
}

function say(filename) {
	return readFile(filename).then(delayMsg);
}

const fs = require('fs');
const ASQ = require('asynquence');
require('asynquence-contrib');

module.exports.say = say;
