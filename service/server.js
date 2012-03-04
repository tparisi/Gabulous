var http = require('http');
var mime = require('mime');
var url = require('url');
var path = require('path');
var util = require('util');
var fs = require('fs');
var faye = require('faye');
var express = require('express');
var WebSocket = require('faye-websocket');
var GabServer = require('./lib/GabServer.js');
var Twitter= require('./lib/twitter.js');

var twit = twit || {};
var twitter = new Twitter(); 

// Main:
function Main() {
    twit.app = express.createServer();
    twit.app.use(express.static(process.cwd()));
    twit.app.use(express.cookieParser()); 
    twit.app.use( express.session( { secret: 'whateva' } ) );
    // Create pub/sub server
    twit.gabServer = GabServer.create();
    // Attach it to http server
    twit.gabServer.attachToHttpServer(twit.app);
    twit.app.listen(8080, '127.0.0.1');
    
    // Twitter authentication route
    twit.app.get('/auth/twitter',function(req,res){
      twitter.authenticate(req,res);
    });

    // Twitter authentication callback
    twit.app.get('/auth/twitter/callback',function(req, res, next){
      twitter.postAuthCallback(req, res, next);  
    });

}

Main();
