import { Card } from "react-bootstrap";
import "./styles.css";
import {
  MDBCard,
  MDBCardBody,
  MDBCardText,
  MDBCardImage, 
  MDBCardFooter
} from "mdb-react-ui-kit";

const User = ({ name, email, avatar }) => {
  return (
    <MDBCard className="user">
      <MDBCardImage variant="top" src={avatar} className="user-img" />
      <MDBCardBody>
        <MDBCardText>{name}</MDBCardText>
      </MDBCardBody>
      <MDBCardFooter >
        <MDBCardText> {email} </MDBCardText>
      </MDBCardFooter>
    </MDBCard>
  );
};

export default User;
