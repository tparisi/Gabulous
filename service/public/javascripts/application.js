Gabulous = {
	init: function(){
		var that = this;
        var game = new Gabscape( { twitterApp: this });
        var container = document.getElementById("container");
        game.initialize( { container : container } );
        SB.Graphics.instance.renderer.domElement.focus();
        game.run();
        this.postTweet();
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

