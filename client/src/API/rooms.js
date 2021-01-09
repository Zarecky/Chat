import Cookie from "js.cookie";

export const getRooms = (cb) => {
  fetch("/api/protected/rooms", {
    method: `GET`,
    headers: {
      "auth-token": Cookie.get("auth-token"),
    },
  })
    .then((response) => {
      if (response.status === 200) return response.json();
      else {
        return null;
      }
    })
    .then((data) => {
      cb(null, data);
    })
    .catch((err) => {
      cb(err);
    });
};

export const getRoom = (id, cb) => {
  fetch(`/api/protected/rooms/${id}`, {
    method: `GET`,
    headers: {
      "auth-token": Cookie.get("auth-token"),
    },
  })
    .then((response) => {
      if (response.status === 200) return response.json();
      else {
        return null;
      }
    })
    .then((data) => {
      cb(null, data);
    })
    .catch((err) => {
      cb(err);
    });
};

export const createRoom = (data, cb) => {
  fetch("/api/protected/rooms/create", {
    method: `POST`,
    headers: {
      "Content-type": "application/json; charset=utf-8",
      "auth-token": Cookie.get("auth-token"),
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      if (response.status === 200) return response.json();
      else {
        return null;
      }
    })
    .then((data) => {
      cb(null, data);
    })
    .catch((err) => {
      cb(err);
    });
};
