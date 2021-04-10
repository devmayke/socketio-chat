const express = require("express");
const { Server } = require("http");
const { clearScreenDown } = require("readline");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);
const PORT  = 3000;
const chat = require("./routes/routes");



let persist = [] 


io.on("connection", socket=>{
    socket.emit("persist",persist)
    console.log(".....>>>>",persist) 

   
    socket.on("chat", chat=>{  
        console.log(chat)

        persist.push(chat) 
             // console.log(chat)
        socket.broadcast.emit("chatClient", chat)

    });  
  
});


app.use(express.static("public"));
app.set("view engine", "ejs");clearScreenDown
app.use("/", chat);





http.listen(PORT, ()=>{
    console.log("running server...");
});

