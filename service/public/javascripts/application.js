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
    TWITTER_CLIENT.getUserData(that.getUserCallback);
    TWITTER_CLIENT.getUserData(that.populateTweetForm);
    this.postTweet();
	},
	userTimelineCallback:function(data)
	{
		// console.log("in userTimelineCallback, data = ", data);
	},
	
	userFriendsCallback:function(data)
	{
    console.log("in userFriendsCallback, data = ", data);
	},
  getUserCallback: function(data)
  {
    console.log("got the data for the logged in user = ", data);
  },
  populateTweetForm: function(data){
    $("#twitter_profile_pic").append("<img src="+data[0]["profile_image_url"]+" />");
    $("#twitter_input").append("<h2>"+data[0]["name"]+"</h2>");
  },
  postTweet: function(){
    $("form#twitter_input_form").submit(function(){
      alert('gonna submit!');
      $.ajax({
        url: '',
        type: 'POST',
        success: function(response){
          alert('successfully tweeted!');
        },
        error: function(){

        }
      });
      return false;
    });
  }
};

Gabulous.init();

