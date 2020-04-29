const host = 'localhost',
	port = 8006,
	http = require('http'),
	http_serv = http.createServer(hanleHTTP).listen(port, host),
	ASQ = require('asynquence'),
	node_static = require('node-static'),
	static_files = new node_static.Server(__dirname),
	io = require('socket.io').listen(http_serv);

function hanleHTTP(req, res) {
	if (req.method === 'GET') {
		if (/^\/\d+(?=$|[\/?#])/.test(req.url)) {
			req.addListener('end', function() {
				req.url = req.url.replace(/^\/(\d+).*$/, '/$1.html');
				static_files.serve(req, res);
			});
			req.resume();
		} else {
			res.writeHead(403);
			res.end('Get out at here!');
		}
	} else {
		res.writeHead(403);
		res.end('Get out at here!');
	}
}
