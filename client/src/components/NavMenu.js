import React, { useState } from 'react';
import {
  Collapse, Container,
  Navbar,
  NavbarBrand,
  NavbarToggler,
  NavItem, NavLink,
} from "reactstrap";
import {Link} from "react-router-dom";
import {logout} from "../API/auth";
import {state} from "../index"

export default function NavMenu() {

  const [collapsed, setCollapsed] = useState(true);

  const toggleNavbar = () => {
    setCollapsed(!collapsed);
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <header>
      <Navbar className="navbar-expand-sm navbar-toggleable-sm ng-white border-bottom border-danger mb-3" light>
        <Container>
          <NavbarBrand tag={Link} to="/">Chat</NavbarBrand>
          <NavbarToggler onClick={toggleNavbar} className="mr-2" />
          <Collapse className="d-sm-inline-flex" isOpen={!collapsed} navbar>
            <ul className="navbar-nav flex-grow">
              <NavItem>
                {state.user.authenticated && <NavLink tag={Link} className="text-dark" to="/chat">Chat</NavLink>}
              </NavItem>
            </ul>
          </Collapse>
          <Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={!collapsed} navbar>
            <ul className="navbar-nav flex-grow">
              {state.user.authenticated ?
                [
                  <NavItem>
                    <NavLink disabled style={{
                      paddingRight: 30
                    }}>
                      Hello, {state.user.name}
                    </NavLink>
                  </NavItem>,
                  <NavItem>
                    <NavLink onClick={handleLogout} tag={Link} className="text-dark" to="/">Logout</NavLink>
                  </NavItem>
                ]
                 :
                [
                  <NavItem>
                    <NavLink tag={Link} className="text-dark" to="/login">Sign in</NavLink>
                  </NavItem>,
                  <NavItem>
                    <NavLink tag={Link} className="text-dark" to="/register">Sign up</NavLink>
                  </NavItem>
                ]
              }
            </ul>
          </Collapse>
        </Container>
      </Navbar>
    </header>
  );
}