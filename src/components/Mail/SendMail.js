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
    const MailDetails = {
      to: email.current.value,
      subject: emailsubject.current.value,
      msg: emailmsg,
    };
    let userEmail = email.current.value;
    if (userEmail !== null) {
      userEmail = userEmail.replace("@", "");
      userEmail = userEmail.replace(".", "");
    }
    const res = await axios.post(
      `https://mail-chat-box-default-rtdb.firebaseio.com/${userEmail}.json`,
      MailDetails
    );

    if (res.status !== 200) {
      console.log("error");
    } else {
      console.log("Email Send");
      email.current.value='';
      emailsubject.current.value='';
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
