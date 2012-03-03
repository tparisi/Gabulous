
function PubSubClient() {
}

PubSubClient.prototype.connect = function(url) {
    this.client = new Faye.Client(url);
    this.client.connect();
}

PubSubClient.prototype.messageListener = function(client, path, message) {
    console.log(path);
    console.log(message);
    alert('Got message: ' + message);
}

PubSubClient.prototype.subscribe = function(path) {
    var me = this;
    this.client.subscribe(path, function(message) {
        me.messageListener(path, message);
    });
}

PubSubClient.prototype.publishError = function(path, msg, error) {
    //console.log(path);
    //console.log(msg);
    console.log('Faye Error');
    console.log(error);
    //alert('There was a problem:' + error.message);
}

PubSubClient.prototype.publish = function(path, msg) {
    var me = this;
    var publication = this.client.publish(path, msg);
    publication.errback(function(error) {
        me.publishError(path, msg, error);
    });
}

PubSubClient.prototype.getClientId = function() {
    return this.client.getClientId();
}