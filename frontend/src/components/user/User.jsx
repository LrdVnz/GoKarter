import { Card } from "react-bootstrap";
import "./styles.css";

const User = ({ name, email, avatar }) => {
  return (
    <Card className="user">
      <Card.Img variant="top" src={avatar} className="user-img" />
      <Card.Body>
        <Card.Text>{name}</Card.Text>
      </Card.Body>
      <Card.Footer>
        <Card.Text> {email} </Card.Text>
      </Card.Footer>
    </Card>
  );
};

export default User;
