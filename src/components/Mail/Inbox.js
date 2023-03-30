import React, { useState, useEffect } from "react";
import {
  MDBTable,
  MDBTableHead,
  MDBTableBody,
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBBtn,
  MDBIcon,
} from "mdb-react-ui-kit";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { MailActions } from "../../store/redux";
import { useHistory } from "react-router-dom";
import usehttp from "../../hooks/use-http";

export default function Inbox() {
  const dispatch = useDispatch();
  const history = useHistory();
  const outbox = useSelector((state) => state.Mail.Mail);
  const [trigger, settrigger] = useState(false);
  let SenderEmail = localStorage.getItem("email");
  if (SenderEmail !== null) {
    SenderEmail = SenderEmail.replace("@", "");
    SenderEmail = SenderEmail.replace(".", "");
  }

  //----------------------------------------------View Mail Details----------------------------------------------->

  const viewMailHandler = async (myid) => {
    try {
      const res = await axios.patch(
        `https://mail-chat-box-default-rtdb.firebaseio.com/${SenderEmail}/inbox/${myid}.json`,
        { read: true }
      );
      if (res.status === 200) {
        settrigger(!trigger);
        history.replace(`/MailDetails/${myid}`);
      }
    } catch (error) {
      alert(error);
    }
  };

  //-----------------------------------------Delete ---------------------------------------------------------->
  const deleteMailHabdler = async (id) => {
    await axios.delete(
      `https://mail-chat-box-default-rtdb.firebaseio.com/${SenderEmail}/inbox/${id}.json`
    );
    settrigger(!trigger);
  };

  const datatransformfunction = (respose) => {
    const trasformData = [];
    for (const key in respose) {
      trasformData.push({
        id: key,
        read: respose[key].read,
        msg: respose[key].msg,
        subject: respose[key].subject,
        to: respose[key].to,
        from: respose[key].from,
      });
    }
    dispatch(MailActions.onsendreadmail(trasformData));
  };

  const httpdata = usehttp(
    `https://mail-chat-box-default-rtdb.firebaseio.com/${SenderEmail}/inbox.json`,
    datatransformfunction
  );

  useEffect(() => {
    httpdata();
  }, [dispatch, trigger]);

  return (
    <MDBContainer fluid sm>
      <MDBCard>
        <MDBCardBody>
          <h3 style={{ textAlign: "center" }}>Inbox</h3>
          <MDBTable hover>
            <MDBTableHead dark>
              <tr>
                <th scope="col">#</th>
                <th scope="col"></th>
                <th scope="col">From :</th>
                <th scope="col">Subject</th>
                <th scope="col">Message</th>
                <th scope="col"></th>
                <th scope="col"></th>
              </tr>
            </MDBTableHead>

            {outbox.map((i, index) => {
              const newmsg = i.msg;

              return (
                <MDBTableBody>
                  <tr>
                    <th scope="row">{index + 1}</th>
                    <td>{i.read ? "" : <MDBIcon fas icon="dot-circle" />}</td>
                    <td>{i.from}</td>
                    <td>{i.subject}</td>
                    <td>{newmsg.slice(0, 45) + "..."}</td>
                    <td>
                      {" "}
                      <MDBBtn
                        color="info"
                        onClick={() => {
                          viewMailHandler(i.id);
                        }}
                      >
                        View
                      </MDBBtn>
                    </td>
                    <td>
                      {
                        <MDBBtn
                          className="me-1"
                          color="danger"
                          onClick={() => deleteMailHabdler(i.id)}
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
  );
}
