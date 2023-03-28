import React,{useState,useEffect} from 'react';
import { MDBTable, MDBTableHead, MDBTableBody,  MDBContainer,
    MDBCard,
    MDBCardBody,MDBIcon } from 'mdb-react-ui-kit';
import Navbar from '../Header/Navbar';
import SendMail from './SendMail';
import { useSelector } from 'react-redux';
import axios from 'axios';
export default function Sent() {
    let SenderEmail =localStorage.getItem('email');
    if (SenderEmail !== null) {
        SenderEmail = SenderEmail.replace("@", "");
        SenderEmail = SenderEmail.replace(".", "");
      }
    const [outbox, setoutbox] = useState([]);
    useEffect(() => {
     const fetch=async ()=>{
       const data=await axios.get(`https://mail-chat-box-default-rtdb.firebaseio.com/${SenderEmail}/sent.json`);
       const respose = await data.data;
    
   
       const trasformData = [];
       for (const key in respose) {
         trasformData.push({
           id: key,
           msg: respose[key].msg,
           subject: respose[key].subject,
           to: respose[key].to,
         });
       }
       setoutbox(trasformData);
              }
     fetch();
    }, []);
    
    const ShowCompose = useSelector((state) => state.compose.compose);
    
  return (<>
      <Navbar />
      <br />
      {ShowCompose && <SendMail />}
      <br/>
      <br/>
    <MDBContainer fluid sm>
    <MDBCard>
      <MDBCardBody>
        <h3 style={{textAlign:'center'}}>Sent Email</h3>
    <MDBTable hover>
      <MDBTableHead dark>
        <tr>
          <th scope='col'>#</th>
          <th scope='col'>Subject</th>
          <th scope='col'>Message</th>
          <th scope='col'>Delete</th>
        </tr>
      </MDBTableHead>
      { outbox.map((i,index)=>{
        return (
            <MDBTableBody>
            <tr>
            
              <th scope='row'>{index+1}</th>
              <td>{i.subject}</td>
              <td>{i.msg}</td>
              <td>{<MDBIcon style={{cursor:'pointer'}} fas icon="trash-alt" />}</td> 
            </tr>
          </MDBTableBody>
        )
      })
     }
    </MDBTable>
    </MDBCardBody>
          </MDBCard>
        </MDBContainer>
        </>
  );
}