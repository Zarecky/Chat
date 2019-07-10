import React from 'react';
import Layout from './components/Layout';
import {Route} from 'react-router-dom';
import Login from "./components/Login";
import Register from "./components/Register";
import Chat from "./components/Chat";

export default function App() {
  return (
    <Layout>
      <Route exact path='/' />
      <Route path='/login' component={Login} />
      <Route path='/register' component={Register} />
      <Route path='/chat' component={Chat} />
    </Layout>
  );
}
