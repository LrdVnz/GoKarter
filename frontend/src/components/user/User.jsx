import { Card } from "react-bootstrap";

const User = ({ name, email, avatar }) => {
  return (
    <Card className="user">
      <Card.Img variant="top" src={avatar} className="user-img" width="20%" />
      <Card.Body>
        <Card.Title>{name}</Card.Title>
      </Card.Body>
      <Card.Footer>
        <Card.Text> {email} </Card.Text>
      </Card.Footer>
    </Card>
  );
};

export default User;
