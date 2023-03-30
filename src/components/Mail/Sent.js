import React, { useState, useEffect } from "react";
import {
  MDBTable,
  MDBTableHead,
  MDBTableBody,
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBBtn,
} from "mdb-react-ui-kit";
import Navbar from "../Header/Navbar";
import SendMail from "./SendMail";
import { useSelector } from "react-redux";
import axios from "axios";
import usehttp from "../../hooks/use-http";
export default function Sent() {
  const [trigger, settrigger] = useState(false);

  //-----------------------------------------Delete ---------------------------------------------------------->
  const deleteMailHabdler = async (id) => {
    await axios.delete(
      `https://mail-chat-box-default-rtdb.firebaseio.com/${SenderEmail}/sent/${id}.json`
    );
    settrigger(!trigger);
  };

  let SenderEmail = localStorage.getItem("email");
  if (SenderEmail !== null) {
    SenderEmail = SenderEmail.replace("@", "");
    SenderEmail = SenderEmail.replace(".", "");
  }
  const [outbox, setoutbox] = useState([]);
  const myfun = (respose) => {
    const trasformData = [];
    for (const key in respose) {
      trasformData.push({
        id: key,
        msg: respose[key].msg,
        subject: respose[key].subject,
        to: respose[key].to,
        from: localStorage.getItem("email"),
      });
      setoutbox(trasformData);
    }
  };
  const fetch = usehttp(
    `https://mail-chat-box-default-rtdb.firebaseio.com/${SenderEmail}/sent.json`,
    myfun
  );
  useEffect(() => {
    fetch();
  }, [trigger]);

  const ShowCompose = useSelector((state) => state.compose.compose);

  return (
    <>
      <Navbar />
      <br />
      {ShowCompose && <SendMail />}
      <br />
      <br />
      <MDBContainer fluid sm>
        <MDBCard>
          <MDBCardBody>
            <h3 style={{ textAlign: "center" }}>Sent Email</h3>
            <MDBTable hover>
              <MDBTableHead dark>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">From :</th>
                  <th scope="col">To :</th>
                  <th scope="col">Subject</th>
                  <th scope="col">Message</th>
                  <th scope="col"></th>
                </tr>
              </MDBTableHead>
              {outbox.map((i, index) => {
                let newmsg = "";
                if (i.msg !== undefined) {
                  newmsg = i.msg;
                }
                return (
                  <MDBTableBody>
                    <tr>
                      <th scope="row">{index + 1}</th>
                      <td>{i.from}</td>
                      <td>{i.to}</td>
                      <td>{i.subject}</td>
                      <td>{newmsg.slice(0, 45) + "..."}</td>

                      <td>
                        {
                          <MDBBtn
                            className="me-1"
                            color="danger"
                            onClick={() => {
                              deleteMailHabdler(i.id);
                            }}
                          >
                            Delete
                          </MDBBtn>
                        }
                      </td>
                    </tr>
                  </MDBTableBody>
                );
              })}
            </MDBTable>
          </MDBCardBody>
        </MDBCard>
      </MDBContainer>
    </>
  );
}
