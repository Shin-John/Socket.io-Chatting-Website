const socket = io();
let messageContainer = document.getElementById("textContainer");
let username = localStorage.getItem("username");

function load() {
    username = localStorage.getItem("username");
    socket.emit("new-user", username);
    socket.emit("add-username-server", username);

    document.getElementById("usernameDisplay").innerHTML= "Chatting as: "+localStorage.getItem("username"); 

    let messageForm = document.getElementById("sendText");
    let messageInput = document.getElementById("messageInput");
    appendMessage("You have joined", "Server: ");



    messageForm.addEventListener("submit", e => {
        e.preventDefault();
        let message = {message: messageInput.value, username: username};
        appendMessage(message.message, "You: ");
        socket.emit("send-chat-message", message);
        messageInput.value = "";
    });
}

socket.on("chat-message", data => {
    console.log(data);
    appendMessage(data.message, data.username + ": ");
});

socket.on("user-connected", name => {
    appendMessage(name + " has joined", "Server: ");
})

socket.on("user-disconnected", name => {
    appendMessage(name+ " has disconnected, returning you to main page", "Server: ");
    setTimeout(function () {
        alert("Previous user disconnected");
        window.location = "/";
    }, 2500);

})
// make a "current chatters text box that lists all the current chatter's names"
socket.on("add-username", users => {
    chatters = document.getElementById("currentChatters");
    console.log(users);
    for(const i in users)
    {
        chatters.innerHTML += "<br>"+users[i];
    }
});

window.addEventListener("beforeunload", even =>{
    socket.emit("user-disconnect", username);
});

let whiteOrGray = false;

function appendMessage(message, from) {
    let messageElement = document.createElement("div");
    whiteOrGray = !whiteOrGray;
    if (whiteOrGray) {
        messageElement.classList.add("text1");
    }
    else {
        messageElement.classList.add("text2");
    }
    let messageContent = document.createTextNode(from+message);
    messageElement.appendChild(messageContent);

    let currentDiv = document.getElementById("bottomText");
    let container = document.getElementById("textContainer");
    container.insertBefore(messageElement, currentDiv);
}

window.onload = () => {
    load();
}
    
