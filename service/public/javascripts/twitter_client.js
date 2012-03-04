TWITTER_CLIENT = {
  userName: $('#user-name').html().trim(),
  init: function(){
    this.getUserTimeLine();
    this.getUserFriends();
  },
  getUserTimeLine: function(callback){
    var self = this;
    $.ajax({
      url: 'http://twitter.com/statuses/user_timeline/'+self.userName+'.json?callback=?',
      dataType: 'json',
      timeout: 15000,
      success: function(data){
        console.log('getUserTimeLine data is ', data);
        callback(data);
      },
      error: function(){
    	  console.log('getUserTimeLine error');
      }
    })
  },
  getUserFriends: function(callback){
    var self = this;
    $.ajax({
      url: 'https://api.twitter.com/1/friends/ids.json?screen_name='+self.userName+'&callback=?',
      dataType: 'json',
      timeout: 15000,
      success:function(data){
        console.log('getUserFriends data is ',data);
        callback(data);
      },
      error: function(){
    	  console.log('getUserFriends error');
      }
    });
  }
}

