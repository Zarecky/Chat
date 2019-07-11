import io from 'socket.io-client';
import Cookie from 'js.cookie';
import {getDate} from "../index";

const socket = {
  connect(cb) {
    this.socket = io('ws://127.0.0.1:3001', {
      query: {
        token: Cookie.get('auth-token')
      }
    });
    this.socket.on('connect', (data) => {
      console.log('Connected:', data);
    });
    this.socket.on('response', (data) => {
      console.log(data);
      cb(data);
    });
  },
  sendMessage(message, created) {
    this.socket.emit('request', {message, created});
  },
  disconnet() {
    this.socket.emit('disconnect', {created: Date.now()});
  }
};

export default socket;