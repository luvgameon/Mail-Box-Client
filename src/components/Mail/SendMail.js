import React, { useRef } from "react";
import {
  MDBInput,
  MDBBtn,
  MDBContainer,
  MDBCard,
  MDBCardBody,
} from "mdb-react-ui-kit";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import axios from "axios";

export default function SendMail() {
  const email = useRef();
  const emailsubject = useRef();
  let emailmsg;

  const onEditorStateChange = (event) => {
    emailmsg = event.getCurrentContent().getPlainText();
  };
  const SendMailhandler = async (event) => {
    event.preventDefault();

    let RecevierEmail = email.current.value;
    let SenderEmail = localStorage.getItem("email");
    if (SenderEmail !== null) {
      SenderEmail = SenderEmail.replace("@", "");
      SenderEmail = SenderEmail.replace(".", "");
    }
    if (RecevierEmail !== null) {
      RecevierEmail = RecevierEmail.replace("@", "");
      RecevierEmail = RecevierEmail.replace(".", "");
    }

    const MailDetails = {
      to: email.current.value,
      subject: emailsubject.current.value,
      msg: emailmsg,
      read: false,
      from: localStorage.getItem("email"),
    };

    try {
      await axios.post(
        `https://mail-chat-box-default-rtdb.firebaseio.com/${RecevierEmail}/inbox.json`,
        MailDetails
      );
      await axios.post(
        `https://mail-chat-box-default-rtdb.firebaseio.com/${SenderEmail}/sent.json`,
        MailDetails
      );
      console.log("Email Send");
      email.current.value = "";
      emailsubject.current.value = "";
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div className="container-sm">
      <form onSubmit={SendMailhandler}>
        <MDBContainer fluid sm>
          <MDBCard>
            <MDBCardBody>
              <MDBInput
                type="email"
                id="form4Example2"
                wrapperClass="mb-4"
                label="To:"
                ref={email}
              />
              <MDBInput
                id="form4Example1"
                wrapperClass="mb-4"
                label="Email Subject"
                ref={emailsubject}
              />

              <Editor
                //  editorState={editorState}

                placeholder="Type your message here"
                toolbarClassName="toolbarClassName"
                wrapperClassName="wrapperClassName"
                editorClassName="editorClassName"
                onEditorStateChange={onEditorStateChange}
              />

              <MDBBtn type="submit" className="mb-4" block>
                Send Mail
              </MDBBtn>
            </MDBCardBody>
          </MDBCard>
        </MDBContainer>
      </form>
    </div>
  );
}
