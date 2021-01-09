const { Room } = require("../model/room");

exports.ws = async (socket, next) => {
  try {
    const room_id = socket.handshake.query.room_id;
    const room = await Room.query().findById(room_id);
    socket.join(room.id.toString());
    socket.room = room;
    next();
  } catch (err) {
    return next(err);
  }
};
