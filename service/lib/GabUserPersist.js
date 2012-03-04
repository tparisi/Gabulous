function GabUserPersist(twitterId) {
    this.twitterId = twitterId;
    this.position = {};
    this.position.x = 0.0;
    this.position.y = 0.0;
    this.position.z = 0.0;
    this.orientation = {};
    this.orientation.pitch = 0.0;
    this.orientation.yaw = 0.0;
    this.orientation.roll = 0.0;
    this.lastseen = 0;
}

GabUserPersist.prototype.moveNear = function(pos) {
    // Fix 5.0 crap
    this.position.x = pos.x + 5.0;
    this.position.z = pos.z + 5.0;
}

function GabUserDatabase() {
    this.users = {};
    console.log('Initializing user database');
}

GabUserDatabase.prototype.knowUser = function(twitterId) {
    return twitterId in this.users;
}

GabUserDatabase.prototype.newUserNearSelf = function(selfTwitterId, userTwitterId) {
    var selfPersist = this.users[selfTwitterId];
    if (selfPersist === undefined) {
        return {x: 0.0, y: 0.0, z: 0.0};
    }
    this.users[userTwitterId] = new GabUserPersist(userTwitterId);
    this.users[userTwitterId].moveNear(selfPersist.position);
    return this.users[userTwitterId].position;
}

GabUserDatabase.prototype.NewUser = function(twitterId) {
    this.users[twitterId] = new GabUserPersist(twitterId);
    this.users[twitterId].position.z = 5.0;
    return this.users[twitterId].position;
}

GabUserDatabase.prototype.updateUserPosition = function(twitterId, position) {
    var persist = this.users[twitterId];
    if (persist === undefined) {
        console.log('position update unknown user %s', twitterId);
        return false;
    }
    this.users[twitterId].position = position;
    this.users[twitterId].lastseen = Date.now();
    return true;
}

GabUserDatabase.prototype.updateUserOrientation = function(twitterId, orientation) {
    var persist = this.users[twitterId];
    if (persist === undefined) {
        console.log('orientation update unknown user %s', twitterId);
        return false;
    }
    this.users[twitterId].orientation = orientation;
    this.users[twitterId].lastseen = Date.now();
    return true;
}

GabUserDatabase.prototype.deleteUser = function(twitterId) {
    return delete this.users[twitterId];
}

GabUserDatabase.prototype.getSelfSpawnPosition = function(selfTwitterId) {
    var persist = this.users[selfTwitterId];
    if (persist === undefined) {
        console.log('Self Spawn - First time seeing user %s\n', selfTwitterId);
        return this.NewUser(selfTwitterId);
    }
    return persist.position;
}

GabUserDatabase.prototype.getSelfSpawnOrientation = function(selfTwitterId) {
    var persist = this.users[selfTwitterId];
    if (persist === undefined) {
        this.NewUser(selfTwitterId);
    }
    return this.users[selfTwitterId].orientation;
}

GabUserDatabase.prototype.getOtherSpawnPosition = function(selfTwitterId, otherTwitterId) {
    var persist = this.users[otherTwitterId];
    if (persist === undefined) {
        console.log('Other Spawn - first time seeing user %s\n', otherTwitterId);
        return this.newUserNearSelf(selfTwitterId, otherTwitterId);
    }
    return persist.position;
}

GabUserDatabase.prototype.collectSpawnPositions = function(selfTwitterId, friends) {
    this.getSelfSpawnPosition(selfTwitterId);
    var spawns = [];
    var i;
    for (i = 0; i < friends.length; i++) {
        spawns[i] = {};
        spawns[i].twitterId = friends[i];
        spawns[i].position = this.getOtherSpawnPosition(selfTwitterId, friends[i]);
        spawns[i].orientation = this.users[friends[i]].orientation;
    }
    return spawns;
}

exports.createDatabase = function() {
    return new GabUserDatabase();
}