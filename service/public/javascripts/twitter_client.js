TWITTER_CLIENT = {
  userName: $('#user-name').html().trim(),
  productionUrl: 'http://localhost:8080',
  idCollection: null,
  userCollection: [],
  init: function(){
    // if(this.userName){
    //   this.getUserTimeLine();
    //   this.getUserFriends();
    // }
  },
  getUserData: function(callback){
    var self = this;
    $.ajax({
      url: 'https://api.twitter.com/1/users/lookup.json?screen_name='+self.userName+'&callback=?',
      dataType: 'json',
      success: function(data){
        callback(data);
      },
      error: function(){

      }
    });
  },
  getUserTimeLine: function(callback){
    var self = this;
    $.ajax({
      url: 'http://twitter.com/statuses/user_timeline/'+self.userName+'.json?callback=?',
      dataType: 'json',
      timeout: 15000,
      success: function(data){
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
      success:function(data){
        self._returnUserJSON(data['ids'].slice(0,100),callback);
      },
      error: function(error){
    	  console.log('getUserFriends error: ',error);
      }
    });
  },
  // Private
  _returnUserJSON: function(dataIds,callback){
    var commaDelimitedIds = dataIds.join(',');  
    var self = this;
    $.ajax({
      url: 'https://api.twitter.com/1/users/lookup.json?user_id='+commaDelimitedIds+'&callback=?',
      dataType: 'json',
      type: 'POST',
      success: function(data){
        callback(data);
      },
      error: function(error){
        console.log('suuuuuuucks!');
      }
    });
  }
}

