Gabulous = {
	init: function(){
		var that = this;
		TWITTER_CLIENT.getUserTimeLine(that.userTimelineCallback);
		TWITTER_CLIENT.getUserFriends(that.userFriendsCallback);
	},
	
	userTimelineCallback:function(data)
	{
		// console.log("in userTimelineCallback, data = ", data);
	},
	
	userFriendsCallback:function(data)
	{
    console.log("in userFriendsCallback, data = ", data);
	},
};

Gabulous.init();

