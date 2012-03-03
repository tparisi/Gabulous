var http = require('http');
var faye = require('faye');

function PubSubServerInstance() {
}

PubSubServerInstance.prototype.attachToHttpServer = function(httpServer) {
    var me = this;
    this.bayeux = new faye.NodeAdapter({mount: '/pubsub', timeout: 45, ping: 10});
    /* Monitors, disable when not in use
    this.bayeux.bind('handshake', function(clientId) {
        me.handshakeMonitor(clientId);
    });
    this.bayeux.bind('disconnect', function(clientId) {
        me.disconnectMonitor(clientId);
    });
    this.bayeux.bind('subscribe', function(clientId, channel) {
        me.subscribeMonitor(clientId, channel);
    });
    this.bayeux.bind('unsubscribe', function(clientId, channel) {
        me.unsubscribeMonitor(clientId, channel);
    });
    this.bayeux.bind('publish', function(clientId, channel, data) {
        me.publishMonitor(clientId, channel, data);
    });
    */
    this.bayeux.attach(httpServer);
    console.log('Attached');
}

PubSubServerInstance.prototype.publishMonitor = function(clientId, channel, data) {
    console.log('pss publish from %j on %j - %j', clientId, channel, data);
}

PubSubServerInstance.prototype.handshakeMonitor = function(clientId) {
    console.log('pss handshake %j\n', clientId);
}

PubSubServerInstance.prototype.disconnectMonitor = function(clientId) {
    console.log('pss disconnect %j\n', clientId);
}

PubSubServerInstance.prototype.subscribeMonitor = function(clientId,channel) {
    console.log('pss subscribe %j %j\n', clientId, channel);
}

PubSubServerInstance.prototype.unsubscribeMonitor = function(clientId,channel) {
    console.log('pss unsubscribe %j %j\n', clientId, channel);
}

exports.create = function() {
    return new PubSubServerInstance();
}