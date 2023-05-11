import React from "react";
// reactstrap components

import { Navbar, Container } from "reactstrap";

const GeneralNavbar = (props) => {
  return (
    <>
      <Navbar className="navbar-top navbar-dark border border-primary" expand="md" id="navbar-main">
        <Container fluid>
          <div className="h1 mb-0 text-uppercase d-none d-lg-inline-block">
            {props.brandText}
          </div>
        </Container>
      </Navbar>
    </>
  );
};

export default GeneralNavbar;