Gabulous = {
	init: function(){
		var that = this;
        var game = new Gabscape( { twitterApp : this } );
		var container = document.getElementById("container");
        game.initialize( { container : container } );
        SB.Graphics.instance.renderer.domElement.focus();
        game.run();
        
//		TWITTER_CLIENT.getUserData(that.getUserCallback);
//		TWITTER_CLIENT.getUserTimeLine(that.userTimelineCallback);
//		TWITTER_CLIENT.getUserFriends(that.userFriendsCallback);
	},
	
	userTimelineCallback:function(data)
	{
		this.timelineData = data;
		// console.log("in userTimelineCallback, data = ", data);
	},
	
	userFriendsCallback:function(data)
	{
		this.friendsData = data;
       // console.log("in userFriendsCallback, data = ", data);
	},

	getUserCallback: function(data)
    {
		this.userData = data;
      // console.log("got the data for the logged in user = ", data);
    }
};

Gabulous.init();

