function printHelp() {
	console.log('3.js (C) Luis Mosquera');
	console.log('');
	console.log('Usage:');
	console.log('--help              Print this help');
	console.log('--file={NAME}       Read the file {NAME}');
	console.log('');
}

var args = require('minimist')(process.argv.slice(2), { string: 'file' });

if (args.help || !args.file) {
	printHelp();
	process.exit(1);
}

const hello = require('./helloworld3.js');

hello
	.say(args.file)
	.val(function(contents) {
		console.log(contents.toString());
	})
	.or(function(err) {
		console.error('Error: ' + err);
	});
