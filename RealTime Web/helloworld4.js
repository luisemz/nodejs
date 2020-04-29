function readFile(filename) {
	return ASQ(function(done) {
		var stream = fs.createReadStream(filename);
		var contents = '';

		stream.on('data', function(chunk) {
			contents += chunk;
		});
		stream.on('end', function() {
			done(contents);
		});
	});
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
