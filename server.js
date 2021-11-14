const express = require('express');
const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server);

const publicDir = __dirname+"/public/";

let users = [];

io.on('connection', socket => {
    console.log("new User");
    socket.on("new-user", name => {
        socket.broadcast.emit("user-connected", name);
    });
    socket.on("send-chat-message", message => {
        socket.broadcast.emit("chat-message", message);
    });
    socket.on("user-disconnect", event => {
        socket.broadcast.emit("user-disconnected", event);
        users = [];
    })
    socket.on("add-username-server", username => {
        users.push(username);
        socket.broadcast.emit("add-username", users);
        socket.emit("add-username", users);
    });
 });

app.use("/public", express.static(publicDir));
let activeVisitors = 0;


app.get("/", function(req,res) {
    activeVisitors++;
    res.sendFile(publicDir+"index.html");
});

app.get("/session.html", function(req,res) {
    activeVisitors++;
    res.sendFile(publicDir+"session.html");
});

app.get("/visitors", function(req,res) {
    res.json({activeVisitors});
});

app.get("/users", function(req,res) {
    res.json({users});
});

server.listen(7000, () => {
    console.log("Express running on port: "+7000);
});
