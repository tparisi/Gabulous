var http = require('http');
var faye = require('faye');
var gup = require('./GabUserPersist.js');

function GabServer() {
    this.userDatabase = gup.createDatabase();
}

GabServer.prototype.attachToHttpServer = function(httpServer) {
    var me = this;
    this.bayeux = new faye.NodeAdapter({mount: '/gab', timeout: 45, ping: 10});
    /* We monitor subscribe and publish for spawn management */
    this.bayeux.bind('subscribe', function(clientId, channel) {
        me.subscribeMonitor(clientId, channel);
    });
    this.bayeux.bind('publish', function(clientId, channel, data) {
        me.publishMonitor(clientId, channel, data);
    });
    /*
    this.bayeux.bind('handshake', function(clientId) {
        me.handshakeMonitor(clientId);
    });
    this.bayeux.bind('disconnect', function(clientId) {
        me.disconnectMonitor(clientId);
    });
    this.bayeux.bind('unsubscribe', function(clientId, channel) {
        me.unsubscribeMonitor(clientId, channel);
    });*/

    this.bayeux.attach(httpServer);
    console.log('Faye Attached - GabServer running.');
}

GabServer.prototype.publishMonitor = function(clientId, channel, data) {
    var channelChunks = channel.split('/');
    if (channelChunks[3] === 'position_update') {
        var r = this.userDatabase.updateUserPosition(channelChunks[2], data.position);
        if (r) {
            console.log('position update for %s - %j', channelChunks[2], data.position);
        }
        return;
    }
    if (channelChunks[3] === 'orientation_update') {
        var r = this.userDatabase.updateUserOrientation(channelChunks[2], data.orientation);
        if (r) {
            console.log('orientation update for %s - %j', channelChunks[2], data.orientation);
        }
        return;
    }
    if (channelChunks[3] === 'spawn_positions') {
        var spawns = this.userDatabase.collectSpawnPositions(channelChunks[2], data.users);
        var i = 0;
        for (i = 0; i < spawns.length; i++) {
            var message = {};
            message.senderTwitterId = spawns[i].twitterId;
            message.senderClientId = this.bayeux.getClient().getClientId();
            message.position = spawns[i].position;
            this.bayeux.getClient().publish('/gab/' + spawns[i].twitterId + '/position_update', message);
            var message2 = {};
            message2.senderTwitterId = spawns[i].twitterId;
            message2.senderClientId = this.bayeux.getClient().getClientId();
            message2.orientation = spawns[i].orientation;
            this.bayeux.getClient().publish('/gab/' + spawns[i].twitterId + '/orientation_update', message2);
        }

        //console.log('Spawn positions for %j - %j', data.users, spawns);
        return;
    }
    console.log('pss publish from %j on %j - %j', clientId, channel, data);
}

GabServer.prototype.subscribeMonitor = function(clientId,channel) {
    //console.log('pss subscribe %j %j\n', clientId, channel);
    var channelChunks = channel.split('/');
    if (channelChunks[3] === 'selfspawn') {
        var twitterId = channelChunks[2];
        var spawn_position = this.userDatabase.getSelfSpawnPosition(twitterId);
        var spawn_orientation = this.userDatabase.getSelfSpawnOrientation(twitterId);
        var msgPath = '/gab/' + channelChunks[2] + '/selfspawn';
        console.log('Sending spawn on %s\n', msgPath);
        this.bayeux.getClient().publish(msgPath, {spawnposition: spawn_position, spawnorientation: spawn_orientation});
    }
}

GabServer.prototype.handshakeMonitor = function(clientId) {
    //console.log('pss handshake %j\n', clientId);
}

GabServer.prototype.disconnectMonitor = function(clientId) {
    //console.log('pss disconnect %j\n', clientId);
}


GabServer.prototype.unsubscribeMonitor = function(clientId,channel) {
    //console.log('pss unsubscribe %j %j\n', clientId, channel);
}

exports.create = function() {
    return new GabServer();
}