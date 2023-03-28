import React, { useState } from "react";
import {
  MDBNavbar,
  MDBContainer,
  MDBIcon,
  MDBNavbarToggler,
  MDBNavbarBrand,
} from "mdb-react-ui-kit";

export default function Navbar() {
  const [showNavColorSecond, setShowNavColorSecond] = useState(false);

  return (
    <>
      <MDBNavbar expand="lg" dark bgColor="dark">
        <MDBContainer fluid>
          <MDBNavbarBrand>Welcome To Mail Chat Box</MDBNavbarBrand>
          <MDBNavbarToggler
            type="button"
            data-target="#navbarColor02"
            aria-controls="navbarColor02"
            aria-expanded="false"
            aria-label="Toggle navigation"
            onClick={() => setShowNavColorSecond(!showNavColorSecond)}
          >
            <MDBIcon icon="bars" fas />
          </MDBNavbarToggler>
        </MDBContainer>
      </MDBNavbar>
    </>
  );
}
