const socket = require('socket.io');
const logger = require('morgan');

const Message = require('./model/message');

//Middleware
const auth = require('./middleware/auth').ws;
const loadUser = require('./middleware/loadUser').ws;

const io = new socket();

io.set('origins', 'localhost:*');
io.set('logger', logger);

io.use(auth);
io.use(loadUser);

io.sockets.on('connection', async socket => {
  console.log('Successful connection');

  const username = socket.user.name;
  const message = new Message({
    type: 'SERVICE_CONNECT',
    user: username,
    date: Date.now()
  });
  await message.save();
  const messages = await Message.find();

  io.sockets.emit('response', messages);

  socket.on('disconnect', async () => {
    console.log('Successful disconnection');
    const message = new Message({
      type: 'SERVICE_DISCONNECT',
      user: username,
      date: Date.now()
    });
    await message.save();
    const messages = await Message.find();

    io.sockets.emit('response', messages);
  });

  socket.on('request', async req => {
    const message = new Message({
      message: req.message,
      date: req.date,
      type: 'USER',
      user: username
    });
    const savedMessage = await message.save();

    io.sockets.emit('response', [savedMessage]);
  })
});

module.exports = io;