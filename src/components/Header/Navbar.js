import React, { useState } from "react";
import {
  MDBNavbar,
  MDBContainer,
  MDBIcon,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarToggler,
  MDBNavbarBrand,
  MDBBtn,
} from "mdb-react-ui-kit";
import { useDispatch, useSelector } from "react-redux";
import { authActions, ShowComposeActions } from "../../store/redux";
import { Link, useHistory } from "react-router-dom";

export default function Navbar() {
  const dispatch = useDispatch();
  const history = useHistory();
  const unreadmail = useSelector((state) => state.Mail.Mail);

//----------------------------------------------->Logout>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>..

  const logouthandler = () => {
    localStorage.clear();
    history.replace("./login");
    dispatch(authActions.ongetToken(localStorage.getItem("idToken")));
  };




//----------------------------------------------->Compose>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>..



  const toggleCompose = () => {
    dispatch(ShowComposeActions.toggleCompose());
  };
  const [showNavColorSecond, setShowNavColorSecond] = useState(false);


  //----------------------------------------------->Unread>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>..

  let unreadcnt = 0;
  unreadmail.map((i) => (i.read ? unreadcnt : unreadcnt++));
  document.title = `Inbox ${unreadcnt}`;

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
          <MDBNavbarNav className="me-auto mb-2 mb-lg-0">
            <MDBNavbarItem className="active">
              <MDBBtn
                className="mx-4"
                color="secondary"
                onClick={toggleCompose}
              >
                Compose
              </MDBBtn>
            </MDBNavbarItem>
            <MDBNavbarItem>
              <Link to="/Mail">
                {" "}
                <MDBBtn className="mx-4" outline color="light">
                  Inbox <sup>{unreadcnt}</sup>
                </MDBBtn>{" "}
              </Link>
            </MDBNavbarItem>
            <MDBNavbarItem>
              <Link to="/sent">
                {" "}
                <MDBBtn className="mx-4" outline color="light">
                  Sent
                </MDBBtn>
              </Link>
            </MDBNavbarItem>
            <MDBNavbarItem></MDBNavbarItem>
          </MDBNavbarNav>
          <MDBBtn
            className="mx-4 float-end"
            color="danger"
            onClick={logouthandler}
          >
            {" "}
            Logout
          </MDBBtn>
        </MDBContainer>
      </MDBNavbar>
    </>
  );
}
