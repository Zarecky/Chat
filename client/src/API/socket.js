import io from "socket.io-client";
import Cookie from "js.cookie";

const socket = {
  connect(roomId, cb) {
    this.socket = io("ws://127.0.0.1:3001", {
      query: {
        token: Cookie.get("auth-token"),
        room_id: roomId,
      },
    });
    this.socket.on("connect", (data) => {
      console.log("Connected:", data);
    });
    this.socket.on("response", (data) => {
      console.log(data);
      cb(data);
    });
  },
  sendMessage(message, created_at) {
    this.socket.emit("request", { message, created_at });
  },
  disconnet() {
    this.socket.emit("disconnect", { created_at: Date.now() });
  },
};

export default socket;
