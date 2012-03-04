var state = {};

function MyChatClient() {
}

MyChatClient.prototype = new PubSubClient();

MyChatClient.prototype.messageListener = function(path, message) {
    var name = document.getElementById("yourname");
    name.innerHTML = 'Your clientId: ' + this.client.getClientId();
    if (path == '/chat' && message.sender != this.client.getClientId()) {
        var output = document.getElementById("output");
        var pre = document.createElement("p");
        pre.style.wordWrap = "break-word";
        pre.innerHTML = message.sender + '> ' + message.text;
        output.appendChild(pre);
    } else if (path == '/chat') {
        var output = document.getElementById("output");
        var pre = document.createElement("p");
        pre.style.wordWrap = "break-word";
        pre.innerHTML = 'You' + '> ' + message.text;
        output.appendChild(pre);
    }
}

function init() {
    state.gabClient = new GabClient('johnmccutchan');
    state.gabClient.connect();
    state.client = new MyChatClient();
    state.client.connect('http://localhost:8080/gab');
    state.client.subscribe('/chat');
}

function SendChatMessage() {
    var chatInput = document.getElementById("chatinput");
    var clientId = state.client.getClientId();
    state.client.publish('/chat', {sender:clientId, text:chatInput.value});
    chatInput.value = "";
}

window.addEventListener("load", init, false);