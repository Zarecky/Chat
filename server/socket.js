const socket = require("socket.io");
const logger = require("morgan");

const { Message } = require("./model/message");

//Middleware
const auth = require("./middleware/auth").ws;
const loadUser = require("./middleware/loadUser").ws;
const loadRoom = require("./middleware/loadRoom").ws;

const io = new socket();

io.set("origins", "localhost:*");
io.set("logger", logger);

io.use(auth);
io.use(loadUser);
io.use(loadRoom);

io.sockets.on("connection", async (socket) => {
  const { room, user } = socket;

  await Message.create(user, room, "SERVICE_CONNECT");
  const messages = await room.getMessages();
  io.to(room.id.toString()).emit("response", messages);

  socket.on("disconnect", async () => {
    console.log("svawe");
    const savedMessage = await Message.create(user, room, "SERVICE_DISCONNECT");
    io.to(room.id.toString()).emit("response", [savedMessage]);
  });

  socket.on("request", async (req) => {
    const savedMessage = await Message.create(user, room, "USER", req.message);
    io.to(room.id.toString()).emit("response", [savedMessage]);
  });
});

module.exports = io;
