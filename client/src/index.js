import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
//import * as serviceWorker from './serviceWorker';
import * as auth from "./API/auth";
import Cookie from 'js.cookie';


const baseUrl = document.getElementsByTagName('base')[0].getAttribute('href');
const rootElement = document.getElementById('root');

export const renderApp = (state, callback = () => {}) => {
  ReactDOM.render(
    <BrowserRouter basename={baseUrl}>
      <App {...state}/>
    </BrowserRouter>,
    rootElement,
    callback);
};

export function getDate(date) {
  return (new Date(date)).toLocaleString('ru', {year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric'})
}

export let state = {
  user: {
    authenticated: false,
    name: null
  }
};

const token = Cookie.get('auth-token');
auth.getUser(token,data => {
  if (!data) {
    state = {
      user: {
        authenticated: false
      }
    };
    return renderApp(state);
  }

  console.log(data);

  state = Object.assign({}, state, {
    user: {
      authenticated: true,
      name: data.name
    }
  });
  renderApp(state);
});

auth.setOnLogin( data => {
  if (!data) {
    state = {
      user: {
        authenticated: false
      }
    };
    return renderApp(state);
  }

  console.log(data);

  state = Object.assign({}, state, {
    user: {
      authenticated: true,
      name: data.name
    }
  });
  renderApp(state);
});

auth.setOnInvalidLogin(err => {
  console.log(err);
});

auth.setOnLogout(() => {
  state = Object.assign({}, state, {
    user: {
      authenticated: false,
      name: null
    }
  });
  renderApp(state);
});


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
//serviceWorker.unregister();
