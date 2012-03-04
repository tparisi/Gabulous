TWITTER_CLIENT = {
  userName: $('#user-name').html().trim(),
  productionUrl: 'http://localhost:8080',
  idCollection: null,
  userCollection: [],
  init: function(){
    if(this.userName){
      this.getUserTimeLine();
      this.getUserFriends();
    }
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
      // url: self.productionUrl + '/get_friends?screen_name='+self.userName,       
      dataType: 'json',
      success:function(data){
        var limit = 10;
        // var limit = userArr.length;
        for(var i = 0; i < limit; i++){
          console.log('data[i]',data['ids'][i]);
          self._returnUserJSON(data['ids'][i]);   
        }
        console.log('+++++++++');
        console.log('final self.userCollection',self.userCollection);
        callback(self.userCollection);
      },
      error: function(error){
    	  console.log('getUserFriends error');
        console.log(error);
      }
    });
  },
  _returnUserJSON: function(userId){
    var self = this;
    $.ajax({
      url: 'https://api.twitter.com/1/users/lookup.json?user_id='+userId+'&callback=?',
      dataType: 'json',
      success: function(data){
        console.log('successfully getting htis user: ',data);         
        console.log('self.userCollection ',self.userCollection);
        self.userCollection.push({
          user: data                        
        });
      },
      error: function(error){
        console.log('suuuuuuucks!');
      }
    });      
  }
}

