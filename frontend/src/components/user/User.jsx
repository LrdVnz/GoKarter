import { Card } from "react-bootstrap";
import "./styles.css";
import {
  MDBCard,
  MDBCardBody,
  MDBCardText,
  MDBCardImage,
  MDBCardFooter,
} from "mdb-react-ui-kit";

const User = ({ name, email, avatar }) => {
  function handleImgError(event) {
    event.target.src =
      "https://t3.ftcdn.net/jpg/05/16/27/58/360_F_516275801_f3Fsp17x6HQK0xQgDQEELoTuERO4SsWV.jpg";
  }

  return (
    <MDBCard className="user">
      <div class="img-container">
        <MDBCardImage
          variant="top"
          onError={handleImgError}
          src={avatar}
          className="user-img"
        />
      </div>
      <MDBCardBody>
        <MDBCardText className="custom-text inner">{name}</MDBCardText>
      </MDBCardBody>
      <MDBCardFooter>
        <MDBCardText className="custom-text inner"> {email} </MDBCardText>
      </MDBCardFooter>
    </MDBCard>
  );
};

export default User;
