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
      <div class="img-container">
      <MDBCardImage variant="top" src={avatar} className="user-img" />
      </div>
      <MDBCardBody>
        <MDBCardText className="custom-text inner">{name}</MDBCardText>
      </MDBCardBody>
      <MDBCardFooter >
        <MDBCardText className="custom-text inner"> {email} </MDBCardText>
      </MDBCardFooter>
    </MDBCard>
  );
};

export default User;
