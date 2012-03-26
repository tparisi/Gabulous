var http = require('http');

function TwitterUserPersist(twitterId) {
    this.twitterId = twitterId;
    this.userData = null;
    this.userTimeline = null;
    this.userFriends = null;
    this.lastUserDataFetched = 0;
    this.lastTimelineFetched = 0;
    this.lastFriendsFetched = 0;
}

TwitterUserPersist.prototype.getUserData = function() {
	
	if (!this.userData)
	{
		this.fetchUserData();
	}
	else
	{
		var now = Date.now();
		var deltat = now - this.lastUserDataFetched;
		if (deltat > FETCH_USERDATA_AFTER)
		{
			this.fetchUserData();
		}
	}
	
	return this.userData;
}

TwitterUserPersist.prototype.fetchUserData = function() {
}

TwitterUserPersist.prototype.getUserTimeline = function() {
	
	if (!this.userTimeline)
	{
		this.fetchUserTimeline();
	}
	else
	{
		var now = Date.now();
		var deltat = now - this.lastUserTimelineFetched;
		if (deltat > FETCH_USERTIMELINE_AFTER)
		{
			this.fetchUserTimeline();
		}
	}
	
	return this.userTimeline;
}

TwitterUserPersist.prototype.getUserFriends = function(callback) {
	if (!this.userFriends)
	{
		this.fetchUserFriends(callback);
	}
	else
	{
		var now = Date.now();
		var deltat = now - this.lastUserFriendsFetched;
		if (deltat > FETCH_USERFRIENDS_AFTER)
		{
			this.fetchUserFriends(callback);
		}
	}
	
	if (callback)
	{
		callback(this.userFriends);
	}
}

TwitterUserPersist.prototype.fetchUserFriends = function(callback){

	console.log('inside TwitterUserPersist.fetchUserFriends');

	  var friendsIds = "";
	  var that = this;
	  
	  var options = {
		      host: 'api.twitter.com',
		      path: '/1/friends/ids.json?screen_name=' + this.twitterId,
		      method: 'GET'
		  };
	
	  console.log('about to call twitter api, path = ', options.path);
	
	  var req = http.request(options, function(res) {
	      console.log('---- inside request ----');
	      console.log('STATUS: ' + res.statusCode);
	      res.setEncoding('utf8');
	      res.on('data', function (chunk) {
	           console.log('BODY: ' + chunk);
	           friendsIds += chunk;
	       });
	      res.on('end', function() {
	          console.log("USER FRIENDS IDS SUCCESS!");
	          that.fetchUserFriendsData(friendsIds, callback);
	      });
		  res.on('error', function(e) {
		      console.log('problem with response: ' + e.message);
		  });
	  });
	  
	  req.on('error', function(e) {
	      console.log('problem with request: ' + e.message);
	      req.end();
	  });
	
	  req.end();		  

}

TwitterUserPersist.prototype.fetchUserFriendsData = function(commaDelimitedIds, callback){
	  
	  console.log('inside TwitterUserPersist.fetchUserFriendsData');
	  console.log('commaDelimitedIds are', commaDelimitedIds);
	  var ids = JSON.parse(commaDelimitedIds).ids;
	  console.log('IDs are', ids ? ids.join(",") : "NULL!!!!");
	  
	  var friends = "";
	  
	  var options = {
	      host: 'api.twitter.com',
	      path: '/1/users/lookup.json?user_id=' + ids,
	      method: 'GET'
	  };

	  console.log('about to call twitter api, path = ' + options.path);

	  var req = http.request(options, function(res) {
	      console.log('---- inside TwitterUserPersist.fetchUserFriendsData response callback ----');
	      console.log('STATUS: ' + res.statusCode);
	      res.setEncoding('utf8');
	      res.on('data', function (chunk) {
	           console.log('BODY: ' + chunk);
	           friends += chunk;
	      });
        res.on('end', function() {
      	    this.userFriends = friends;
            console.log("USER FRIENDS DATA SUCCESS!");
            if (callback)
            {
            	callback(friends);
            }
        });
        res.on('error', function() {
      	    this.userFriends = null;
            console.log("USER FRIENDS DATA SUCCESS!");
            if (callback)
            {
            	callback(null);
            }
	  });	  

	  });	  
}

// Fetch user data no more than every 30 mins
TwitterUserPersist.FETCH_USERDATA_AFTER = 30 * 60 * 1000;
//Fetch timeline no more than every 1 minute
TwitterUserPersist.FETCH_USERTIMELINE_AFTER = 1 * 60 * 1000;
//Fetch friends data no more than every 1 minute
TwitterUserPersist.FETCH_USERFRIENDS_AFTER = 30 * 60 * 1000;

function TwitterCache() {
    this.users = {};
    console.log('Initializing twitter cache');
}

TwitterCache.prototype.getUserData = function(twitterId) {
    if (!this.users[twitterId])
    	this.users[twitterId] = new TwitterUserPersist(twitterId);
    
    return this.users[twitterId].getUserData();
}

TwitterCache.prototype.getUserTimeline = function(twitterId) {
    if (!this.users[twitterId])
    	this.users[twitterId] = new TwitterUserPersist(twitterId);
    
    return this.users[twitterId].getUserTimeline();
}

TwitterCache.prototype.getUserFriends = function(twitterId, callback) {
	console.log("In TwitterCache.prototype.getUserFriends, twitterId = ", twitterId);
	
    if (!this.users[twitterId])
    	this.users[twitterId] = new TwitterUserPersist(twitterId);
    
    return this.users[twitterId].getUserFriends(callback);
}

exports.createCache = function() {
    return new TwitterCache();
}