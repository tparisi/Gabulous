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

  console.log('------========');
  console.log('oa',oa);

  oa.getOAuthRequestToken(function(error, oauth_token, oauth_token_secret, results){
    if(error){
      console.log('ERROR',error);
      response.send('boooohooo, did not work');
    }
    console.log('--------');
    console.log('da request is',request);
    console.log('da request.session is',request.session);
    request.session.oauth = {};
    request.session.oauth.token = oauth_token;
    console.log('oauth.token',request.session.oauth.token);
    request.session.oauth.token_secret = oauth_token_secret;
    console.log('oauth.token.secret',request.session.oauth.token_secret);
    response.redirect('https://twitter.com/oauth/authenticate?oauth_token='+oauth_token);
  });
}

module.exports = Twitter;
