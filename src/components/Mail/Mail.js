import React from "react";
import { useSelector } from "react-redux";
import Navbar from "../Header/Navbar";
import Inbox from "./Inbox";

import SendMail from "./SendMail";

export default function Mail() {
  const ShowCompose = useSelector((state) => state.compose.compose);

  return (
    <>
      <Navbar />

      <br />

      {ShowCompose && <SendMail />}
      <br />
      <br />
      
      <Inbox />
    </>
  );
}
