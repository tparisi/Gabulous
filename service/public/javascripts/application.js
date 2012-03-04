Gabulous = {
	init: function(){
		var that = this;
        var game = new Gabscape( { twitterApp: this });
        var container = document.getElementById("container");
        game.initialize( { container : container } );
        SB.Graphics.instance.renderer.domElement.focus();
        game.run();
        this.postTweet();
        TWITTER_CLIENT.getUserData(this.populateTweetForm);
	},
  populateTweetForm: function(data){
    $("#twitter_profile_pic").append("<img src="+data[0]["profile_image_url"]+" />");
    // $("#twitter_input").append("<h2>"+data[0]["name"]+"</h2>");
  },
  postTweet: function(){
    $("form#twitter_input_form").submit(function(){
      var status = $('textarea#twitter_input_text').val()
      $.ajax({
        url: 'https://api.twitter.com/1/statuses/update.json/status='+status+'&callback=?',
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

