var url  = require('url');
var http = require('http');

function Proxy(){
  if(!(this instanceof arguments.callee)){
    return new arguments.callee(arguments);
  } 
}

Proxy.prototype.get = function(proxyReq,proxyRes){
    var params = url.parse(proxyReq.url, true);
    var imgURL = params.query.src;
    console.log("Getting image url: ", imgURL);

    var destParams = url.parse(imgURL);

    var reqOptions = {
        host : destParams.host,
        port : 80,
        path : destParams.pathname,
        method : "GET"
    };

    console.log("Request options: ", reqOptions);
    
    var req = http.request(reqOptions, function(res) {
        console.log("In the callback...");
        var headers = res.headers;
        headers['Access-Control-Allow-Origin'] = '*';
        headers['Access-Control-Allow-Headers'] = 'X-Requested-With';
        proxyRes.writeHead(200, headers);

        res.on('data', function(chunk) {
        	proxyRes.write(chunk);
            console.log("writing data...");
        });

        res.on('end', function() {
        	proxyRes.end();
            console.log("Proxy Success!");
        });
    });

    req.on('error', function(e) {
        console.log('problem with request: ' + e.message);
        proxyRes.writeHead(503);
        proxyRes.write("An error happened!");
        proxyRes.end();
    });
    req.end();

}

module.exports = Proxy;
