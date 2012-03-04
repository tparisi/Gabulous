TWITTER_CLIENT = {
  userName: $('#user-name').html().trim(),
  init: function(){
    this.getUserTimeLine();
  },
  getUserTimeLine: function(){
    var self = this;
    $.ajax({
      url: 'http://twitter.com/statuses/user_timeline/'+self.userName+'.json?callback=?',
      dataType: 'json',
      timeout: 15000,
      success: function(data){
        console.log('data is ', data);
      },
      error: function(){
        alert('WAAA WAAA WAAA - BAD!');
      }
    })
  }
}

TWITTER_CLIENT.init();
