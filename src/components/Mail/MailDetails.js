import React from "react";
import {
  MDBCard,
  MDBCardTitle,
  MDBCardText,
  MDBCardBody,
  MDBCardHeader,
  MDBBtn,
} from "mdb-react-ui-kit";

import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import Navbar from "../Header/Navbar";
import SendMail from "./SendMail";

export default function MailDetails() {
  const myid = useParams();

  const mail = useSelector((state) => state.Mail.Mail);

  const ShowCompose = useSelector((state) => state.compose.compose);
  let indxOfItem = mail.findIndex((i) => i.id === myid.id);
  let maildetails;

  if (indxOfItem !== -1) {
    maildetails = mail[indxOfItem];
  }

  return (
    <>
      <Navbar />
      <br />
      {ShowCompose && <SendMail />}
      <br />
      <br />

      <div className="container">
        <MDBCard shadow="0" border="dark" background="white">
          <MDBCardHeader>
            From: <strong>{maildetails.from}</strong>
          </MDBCardHeader>
          <MDBCardHeader>
            Subject : <strong>{maildetails.subject}</strong>
          </MDBCardHeader>
          <MDBCardBody className="text-dark">
            <MDBCardTitle>Message</MDBCardTitle>
            <MDBCardText>{maildetails.msg}</MDBCardText>
          </MDBCardBody>
        </MDBCard>
        <br />
        <br />
        <div style={{ textAlign: "center" }}>
          <Link to="/Mail">
            <MDBBtn>Back</MDBBtn>
          </Link>
        </div>
      </div>
    </>
  );
}
