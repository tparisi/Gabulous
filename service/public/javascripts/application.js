Gabulous = {
	init: function(){
		var that = this;
        var game = new Gabscape();
		var container = document.getElementById("container");
        game.initialize( { container : container } );
        SB.Graphics.instance.renderer.domElement.focus();
        game.run();
		TWITTER_CLIENT.getUserTimeLine(that.userTimelineCallback);
		TWITTER_CLIENT.getUserFriends(that.userFriendsCallback);
	},
	
	userTimelineCallback:function(data)
	{
		console.log("in userTimelineCallback, data = ", data);
		this.timelineData = data;
	},
	
	userFriendsCallback:function(data)
	{
		console.log("in userFriendsCallback, data = ", data);
		this.friendsData = data;
	},
};

Gabulous.init();

