var OAuth= require('oauth').OAuth;

function Twitter(){
  if(!(this instanceof arguments.callee)){
    return new arguments.callee(arguments);
  } 
}

Twitter.prototype.authenticate = function(request,response){
  console.log('ABOUT TO AUTHENTICATE');
  var oa = new OAuth(
    "https://api.twitter.com/oauth/request_token",
    "https://api.twitter.com/oauth/access_token",
    "SICgH4FUlyrkEBlm1uMYQ",
    "BEB1iJAWNWtHzaYAnGZE6Ploo4512CzUocdxkFSSt8",
    "1.0",
    "http://127.0.0.1:8080/auth/twitter/callback",
    "HMAC-SHA1"
  );

  oa.getOAuthRequestToken(function(error, oauth_token, oauth_token_secret, results){
    if(error){
      console.log('ERROR',error);
      response.send('boooohooo, did not work');
    }
    request.session.oauth = {};
    request.session.oauth.token = oauth_token;
    request.session.oauth.token_secret = oauth_token_secret;
    console.log('request.session.oauth',request.session.oauth);
    response.redirect('https://twitter.com/oauth/authenticate?oauth_token='+oauth_token);
  });
}

Twitter.prototype.postAuthCallback = function(request, response, next){
  console.log('INSIDE POSTAUTHCALLBACK');
  console.log('request.session',request.session);
  console.log('request.session.oauth',request.session.oauth);
  // if (request.session.oauth) {

  // } else {
  //   next(new Error("you're not supposed to be here."))
  // }
};

module.exports = Twitter;
