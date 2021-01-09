import React from "react";
import { Route } from "react-router-dom";

import Layout from "./components/Layout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Room from "./pages/Room";
import Rooms from "./pages/Rooms";

export default function App() {
  return (
    <Layout>
      <Route exact path="/" />
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
      <Route exact path="/rooms" component={Rooms} />
      <Route path="/rooms/:id" component={Room} />
    </Layout>
  );
}
