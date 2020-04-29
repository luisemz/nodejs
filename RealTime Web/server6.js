const host = 'localhost',
	port = 8006,
	http = require('http'),
	http_serv = http.createServer(handleHTTP).listen(port, host),
	ASQ = require('asynquence'),
	node_static = require('node-static'),
	static_files = new node_static.Server(__dirname),
	io = require('socket.io').listen(http_serv);

io.on('connection', handleIO);

function handleIO(socket) {
	function disconnect() {
		clearInterval(intv);
		console.log('Client connected');
	}
	function typeIt(msg) {
		socket.broadcast.emit('messages', msg);
	}
	function spy(x, y) {
		socket.broadcast.emit('spy', { x: x, y: y });
	}

	console.log('Client connected');

	var intv = setInterval(function() {
		socket.emit('hello', Math.random());
	}, 1000);

	socket.on('disconnect', disconnect);
	socket.on('typeIt', typeIt);
	socket.on('spy', spy);
}

function handleHTTP(req, res) {
	if (req.method === 'GET') {
		if (/^\/\d+(?=$|[\/?#])/.test(req.url)) {
			req.addListener('end', function() {
				req.url = req.url.replace(/^\/(\d+).*$/, '/$1.html');
				static_files.serve(req, res);
			});
			req.resume();
		} else if (req.url === '/jquery.js') {
			static_files.serve(req, res);
		} else {
			res.writeHead(403);
			res.end('Get out at here!');
		}
	} else {
		res.writeHead(403);
		res.end('Get out at here!');
	}
}
