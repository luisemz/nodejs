function printHelp() {
	console.log('1.js (C) Luis Mosquera');
	console.log('');
	console.log('Usage:');
	console.log('--help              Print this help');
	console.log('--name              Say Hello to {name}');
	console.log('');
}

var args = require('minimist')(process.argv.slice(2), { string: 'name' });

if (args.help || !args.name) {
	printHelp();
	process.exit(1);
}

var name = args.name;

console.log('Hello ' + name);
