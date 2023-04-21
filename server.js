//installing all variable i
const express = require("express");
// setting our express which allow us to create server
const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server);
//socket io
//installing socket .io
app.use(express.static("public"));

io.on("connection", (socket) => {
  //   console.log(socket);
  console.log("User connected", socket.id);

  // receiving the message and distribute to every one
  socket.on("message", (data) => {
    io.emit("message", data);
    //data is obj which was pass in fronted part
    console.log(data.message);
  });

  //notification the who joined the chat
  socket.on("entered", (data) => {
    io.emit("entered", data);
  });
  //exit any one
  socket.on("exits", (data) => {
    io.emit("exits", data);
  });
  socket.on("disconnect", () => {
    console.log("user disconnected", socket.id);
  });
});
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
