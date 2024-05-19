import "./styles.css";
import { Container, Col, Row } from "react-bootstrap";
import { useState, useEffect } from "react";
import User from "../user/User";

const Leadeboard = () => {
  const [users, setUsers] = useState();
  const [isError, setIsError] = useState();
  const [scores, setScores] = useState();

  useEffect(() => {
    getUsers();
    getScores();
  }, []);

  async function getUsers() {
    try {
      const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/users`);
      // Per ora senza autorizzazione

      const json = await res.json();

      if (json) {
        setUsers(json);
      }
    } catch (err) {
      console.log(err);
    }
  }

  async function getScores() {
    try {
      const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/scores`);
      // Per ora senza autorizzazione

      const json = await res.json();

      if (json) {
        setScores(json);
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <Container fluid="sm" className="p-2 main">
      {/* UsersRow */}
      {!users && <p> loading </p>}
      <Row>
        {users &&
          users.slice(0, 4).map((user, i) => (
            <Col key={`user-${i}`} className="mt-1 g-0">
              <User {...user} />
            </Col>
          ))}
      </Row>
      <Row>
        {scores &&
          scores.map((score, i) => (
            <Row key={`score-${i}`} className="mt-1 g-0">
              <p>{i === 0 && "average : " + score.average} </p>
              <p>{i === 1 && "lap1: " + score.lap1 }</p>
            </Row>
          ))}
      </Row>
    </Container>
  );
};

export default Leadeboard;
