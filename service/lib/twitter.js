var OAuth= require('oauth').OAuth;
var url  = require('url');
var http = require('http');
var twtr = require('twitter');
var https = require('https')
var oa;
var _twitterConsumerKey = 'SICgH4FUlyrkEBlm1uMYQ';
var _twitterConsumerSecret = 'BEB1iJAWNWtHzaYAnGZE6Ploo4512CzUocdxkFSSt8'; 

function Twitter(){
  if(!(this instanceof arguments.callee)){
    return new arguments.callee(arguments);
  } 
}

Twitter.prototype.authenticate = function(req,res){
  console.log('ABOUT TO AUTHENTICATE');
  oa = new OAuth(
    "https://api.twitter.com/oauth/request_token",
    "https://api.twitter.com/oauth/access_token",
    _twitterConsumerKey,
    _twitterConsumerSecret,
    "1.0A",
    "http://localhost:8080/auth/twitter/callback",
    "HMAC-SHA1"
  );

  oa.getOAuthRequestToken(function(error, oauthToken, oauthTokenSecret, results){
    if (error) {
      res.send("Error getting OAuth request token : " + sys.inspect(error), 500);
    } else {  
      req.session.oauthRequestToken = oauthToken;
      req.session.oauthRequestTokenSecret = oauthTokenSecret;
      res.redirect("https://twitter.com/oauth/authorize?oauth_token="+req.session.oauthRequestToken);      
    }
  });
}

Twitter.prototype.postAuthCallback = function(req, res, next){
  oa.getOAuthAccessToken(req.session.oauthRequestToken, req.session.oauthRequestTokenSecret, req.query.oauth_verifier, function(error, oauthAccessToken, oauthAccessTokenSecret, results) {
    if(error){
      console.log('boooooooo');
      console.log('error is: ', error);
    } else {
    req.session.oauthAccessToken = oauthAccessToken;
      req.session.oauthAccessTokenSecret = oauthAccessTokenSecret;
      // Right here is where we would write out some nice user stuff
      oa.get("http://twitter.com/account/verify_credentials.json", req.session.oauthAccessToken, req.session.oauthAccessTokenSecret, function (error, data, response) {
        if (error) {
          res.send("Error getting twitter screen name : " + sys.inspect(error), 500);
        } else {
          var twitterData = JSON.parse(data);
          req.session.twitterScreenName = twitterData["screen_name"];
          console.log('req.session',req.session);
          res.cookie('twitterUserName', twitterData['screen_name'], { expires: 0, httpOnly: true });
          res.render('authenticated', {
            screenName: twitterData['screen_name']
          });
        }  
      });
    } 
  });
};

Twitter.prototype.getUserFriends = function(req,res){
  console.log('inside server getUserFriends');
  var url_parts = url.parse(req.url, true);
  var query = url_parts.query;
  var screenName = query['screen_name'];
  var friends = [];
  
  var options = {
      host: 'api.twitter.com',
      path: '/1/friends/ids.json?screen_name=fromthought2web',
      // port : '443',
      method: 'GET'
  };

  console.log('about to call twitter api');

  var req = https.request(options, function(res) {
      console.log('---- inside request ----');
      // console.log('STATUS: ' + res.statusCode);
      // res.setEncoding('utf8');
      // res.on('data', function (chunk) {
      //     console.log('BODY: ' + chunk);
      // });
  });
  


  // var twit = new twtr({
  //     consumer_key: _twitterConsumerKey,
  //     consumer_secret: _twitterConsumerSecret,
  //     access_token_key: req.session.oauthAccessToken,
  //     access_token_secret: req.session.oauthAccessTokenSecret  
  // });
   
  // // console.log('twit',twit);
  
  // twit.get('https://api.twitter.com/1/friends/ids.json?screen_name=fromthought2web', {callback: "&#063;"}, function(data) {
  //     // sys.puts(sys.inspect(data));
  //   console.log('data after twit.get',data);
  // });
  

  res.send(friends);
};

module.exports = Twitter;
