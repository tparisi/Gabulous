var http = require('http');
var mime = require('mime');
var url = require('url');
var path = require('path');
var util = require('util');
var fs = require('fs');

var twit = twit || {};

twit.httpRequestListener = function(request, response) {
    var uri = url.parse(request.url).pathname;
    if (uri == "/") {
        uri = "/index.html";
    }
    var fileName = path.join(process.cwd(), uri);
    var fileType = mime.lookup(fileName);
    var fileStream = undefined;
    var fileStream = fs.createReadStream(fileName);
    fileStream.on('error', function(exception) {
        var errorString1 = util.format('404 Not Found - %s (%s)\n', fileName, fileType);
        var errorString2 = util.format('%j\n', exception);
        response.writeHead(404, {'Content-Type': 'text/plain'});
        response.write(errorString1);
        response.write(errorString2);
        response.end();
        console.log(errorString1);
        console.log(errorString2);
        return;
    });

    response.writeHead(200, {'Content-Type':fileType});
    fileStream.pipe(response);
}

twit.httpConnectionListener = function(socket) {
    console.log('Received connection from %s', socket.remoteAddress);
}

twit.serverListenListener = function(server) {
    var address = server.address();
    console.log('Server is listening on %s:%d', address.address, address.port);
}

twit.httpServer = http.createServer(function (req, res) {
    twit.httpRequestListener.call(twit, req, res);
});

twit.httpServer.on('connection', function(socket) {
    twit.httpConnectionListener.call(twit, socket);
});

twit.httpServer.listen(8080, '127.0.0.1', function() {
    twit.serverListenListener.call(twit, this);
});
