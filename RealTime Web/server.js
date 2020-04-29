const host = 'localhost';
const port = 8006;

const http = require('http');
const http_serv = http.createServer(hanleHTTP).listen(port, host);

const ASQ = require('asynquence');

function hanleHTTP(req, res) {
	if (req.method === 'GET') {
		if (req.url === '/') {
			res.writeHead(200, { 'Content-type': 'text/plain' });
			ASQ(function(done) {
				done(Math.random());
			})
				.then(function(done, num) {
					done('Hello World' + num);
				})
				.val(function(msg) {
					res.end(msg);
				});
		} else {
			res.writeHead(403);
			res.end('Get out at here!');
		}
	} else {
		res.writeHead(403);
		res.end('Get out at here!');
	}
}
