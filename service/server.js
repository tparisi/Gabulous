var http = require('http');
var mime = require('mime');
var url = require('url');
var path = require('path');
var util = require('util');
var fs = require('fs');
var faye = require('faye');
var express = require('express');
var WebSocket = require('faye-websocket');
var PubSubServer = require('./lib/pubsubserver.js');

var twit = twit || {};

// Main:
function Main() {
    twit.app = express.createServer();
    twit.app.use(express.static(process.cwd()));
    // Create pub/sub server
    twit.psServer = PubSubServer.create();
    // Attach it to http server
    twit.psServer.attachToHttpServer(twit.app);
    twit.app.listen(8080, '127.0.0.1');
}

Main();