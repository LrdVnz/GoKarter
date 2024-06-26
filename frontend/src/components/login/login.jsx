import { Container, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./styles.css";
import { useContext } from "react";
import { CurrentUserContext } from "../../contexts/currentUserContext";

export default function Login() {
  const navigate = useNavigate();
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);

  const handleGoogleAuth = (event) => {
    // event.preventDefault()

    const str = `${process.env.REACT_APP_BACKEND_URL}/user/googleLogin`;
    window.open(str, "_self");
  };

  async function handleSubmit(event) {
    event.preventDefault();

    const loginData = JSON.stringify({
      name: event.target.elements["input-username"].value,
      password: event.target.elements["input-password"].value,
    });

    try {
      const res = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/user/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: loginData,
        }
      );

      const json = await res.json();
      console.log(json);
      const authToken = json.accessToken;
      const currentUser = JSON.stringify(json.user);
      localStorage.setItem("accessToken", authToken);
      localStorage.setItem("currentUser", currentUser);
      setCurrentUser(JSON.parse(currentUser));
      navigate("/");
    } catch (err) {
      alert("error. Check if username and password are correct");
    }
  }

  return (
    <Container fluid="sm">
      <h1 className="blog-main-title">
        Effettua il login con il tuo username e la tua password:
      </h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="input-username">
          <Form.Label className="custom-text inner"> Username </Form.Label>
          <Form.Control type="text" />
        </Form.Group>
        <Form.Group controlId="input-password">
          <Form.Label className="custom-text inner"> Password </Form.Label>
          <Form.Control type="password" />
        </Form.Group>
        <Form.Group className="d-flex mt-3 justify-content-center">
          <Button
            type="submit"
            size="lg"
            variant="dark"
            className="btn-custom button-text"
          >
            Invia
          </Button>
        </Form.Group>
      </Form>
      <Form.Group>
        <Button onClick={handleGoogleAuth} className="button-text">
          Accedi con Google
        <i class="fa-brands fa-google" style={{paddingLeft:"10px"}}></i>
        </Button>
      </Form.Group>
    </Container>
  );
}
