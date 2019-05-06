import React from "react";
import { Link } from "react-router-dom";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem } from 'reactstrap';
import { Container, Row, Col, Alert } from "reactstrap";
import { IndexLinkContainer, LinkContainer } from "react-router-bootstrap";

const LoggedOutView = () => {
  return (
    <Nav pullRight>
      <LinkContainer to="/login">
        <NavItem>Login</NavItem>
      </LinkContainer>

      <LinkContainer to="/register">
        <NavItem>Sign up</NavItem>
      </LinkContainer>
    </Nav>
  );
};

const LoggedInAccount = props => (
  <Navbar.Text>
    Logged in as: <b>{props.currentUser}</b>
  </Navbar.Text>
);

const LoggedInView = () => (
  <Navbar.Collapse>
    <Nav pullRight>
      <IndexLinkContainer to="/">
        <NavItem>Dashboard</NavItem>
      </IndexLinkContainer>

      <LinkContainer to="/settings">
        <NavItem>Settings</NavItem>
      </LinkContainer>

      <LinkContainer to="/archive">
        <NavItem>Archive</NavItem>
      </LinkContainer>

      <LinkContainer to="/livefeed">
        <NavItem>Live Feed</NavItem>
      </LinkContainer>

      <LinkContainer to="/logout">
        <NavItem>Logout</NavItem>
      </LinkContainer>
    </Nav>
  </Navbar.Collapse>
);


export default class Header extends React.Component {
  constructor(props) {
  super(props);

  this.toggle = this.toggle.bind(this);
  this.state = {
    isOpen: false
  };
}
toggle() {
  this.setState({
    isOpen: !this.state.isOpen
  });
}
  render() {
    return (
        <Navbar color="dark" dark expand="sm" sticky="top">
          <NavbarBrand href="/" className="mr-auto">Lattice Agriculture</NavbarBrand>


          <NavbarToggler onClick={this.toggle} className="mr-2"/>
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink href="/allEvents/">Devices</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/login/">About Us</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/allEvents/">Oppurtunities</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/allEvents/">Updates</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="https://github.com/reactstrap/reactstrap">GitHub</NavLink>
              </NavItem>
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  My Account
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem>
                    Register
                  </DropdownItem>
                  <DropdownItem>
                  <NavItem>
                    <NavLink href="/login/" style={{color: 'black', textDecoration: 'none'}}>Log in</NavLink>
                  </NavItem>
                  </DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem>
                    Account Settings
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </Nav>
          </Collapse>



        </Navbar>

    );
  }
}
