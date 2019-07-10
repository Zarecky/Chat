import React from 'react';
import NavMenu from './NavMenu';
import {Container} from "reactstrap";

export default function Layout(props) {
  return (
    <div>
      <NavMenu />
      <Container>
        {props.children}
      </Container>
    </div>
  );
}