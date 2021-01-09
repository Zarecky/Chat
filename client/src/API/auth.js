import Cookie from "js.cookie";

let onLogin = () => {};
let onInvalidLogin = () => {};
let onLogout = () => {};

export const login = (data, cb) => {
  fetch("/api/login", {
    method: `POST`,
    headers: {
      "Content-type": "application/json; charset=utf-8",
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      if (response.status !== 200) {
        throw new Error(response.statusText);
      }

      const token = response.headers.get("auth-token");
      Cookie.set("auth-token", token);
      getUser(token, (data) => {
        cb(null, data);
        onLogin(data);
      });
    })
    .catch((err) => {
      cb(err);
      onInvalidLogin(err);
    });
};

export const register = (data, cb) => {
  fetch("/api/register", {
    method: `POST`,
    headers: {
      "Content-type": "application/json; charset=utf-8",
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      if (response.status !== 200) {
        throw new Error(response.statusText);
      }

      const token = response.headers.get("auth-token");
      Cookie.set("auth-token", token);
      getUser(token, (data) => {
        cb();
        onLogin(data);
      });
    })
    .catch((err) => {
      onInvalidLogin(err);
    });
};

export const logout = () => {
  Cookie.remove("auth-token");
  onLogout();
};

export const getUser = (token, cb) => {
  if (!token) {
    cb();
  }
  fetch("/api/protected/profile", {
    headers: {
      "auth-token": token,
    },
  })
    .then((response) => {
      if (response.status === 200) return response.json();
      else {
        return null;
      }
    })
    .then((data) => {
      cb(data);
    });
};

export const setOnLogin = (callback) => {
  onLogin = callback;
};
export const setOnInvalidLogin = (callback) => {
  onInvalidLogin = callback;
};
export const setOnLogout = (callback) => {
  onLogout = callback;
};
