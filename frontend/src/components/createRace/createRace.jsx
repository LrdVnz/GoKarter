import { Container, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./styles.css";

export default function CreateRace() {
  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();

    console.log(event.target.elements)
    const formData = new FormData();

    formData.append('date', event.target.elements["input-date"].value);
  
    try {
      const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/user/register`, {
        method: "POST",
        body: formData, 
      });
  
      navigate("/");
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <Container fluid="sm">
      <h1 className="blog-main-title">Registrati: </h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="input-date">
          <Form.Label> Date </Form.Label>
          <Form.Control type="text" />
        </Form.Group>
        <Form.Group className="d-flex mt-3 justify-content-center">
          <Button type="submit" size="lg" variant="dark">
            invia
          </Button>
        </Form.Group>
      </Form>
    </Container>
  );
}
