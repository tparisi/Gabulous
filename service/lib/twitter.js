var OAuth= require('oauth').OAuth;
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
          console.log('ABOUT TO SEND!!!!');
          var twitterData = JSON.parse(data);
          req.session.twitterScreenName = twitterData["screen_name"];
          // res.send('You are signed in: ' + req.session.twitterScreenName);
          res.render('authenticated', {
            screenName: twitterData['screen_name']
          });
        }  
      });
    } 
  });
};

module.exports = Twitter;
