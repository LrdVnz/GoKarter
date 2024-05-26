import "./styles.css";
import { Container, Col, Row } from "react-bootstrap";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import User from "../user/User";

const Leadeboard = () => {
  const [users, setUsers] = useState();
  const [isError, setIsError] = useState();
  const [race, setRace] = useState();
  const [laps, setLaps] = useState();
  const [userData, setUserData] = useState();

  const params = useParams();
  const { id } = params;

  useEffect(() => {
    getRace();
    getLaps();
    createUserData()
  }, []);

  useEffect(() => {
    if (race) {
      setUsers(race["users"]);
    }
  }, [race]);

  async function getRace() {
    try {
      const res = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/race/${id}`
      );
      // Per ora senza autorizzazione

      const json = await res.json();

      if (json) {
        setRace(json);
      }
    } catch (err) {
      console.log(err);
    }
  }

  async function getLaps() {
    try {
      const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/lap/${id}`);
      // Per ora senza autorizzazione

      const json = await res.json();

      if (json) {
        setLaps(json);
      }
    } catch (err) {
      console.log(err);
    }
  }

  function createUserData() {
    const userDataArr = {
      /*  "user_id" : {
         avg: num,
         laps: []
       }*/
    };
    if (users && laps) {
      users.forEach((user, index) => {
        let currentUser = {
          laps: [],
        };
        let currentId = user["user"]["_id"];

        let userLaps = laps.filter((lap, a) => {
          if (lap["user"]["_id"] === currentId) {
            return true;
          }
        });

        currentUser.laps = userLaps;
        userDataArr[`${currentId}`] = currentUser;
      });
      setUserData(userDataArr);
    }
  }

  return (
    <Container fluid="sm" className="p-2 main">
      <Row>
        {users &&
          users.map((user, i) => (
            <Col key={`user-${i}`} className="mt-1 g-0">
              <User {...user.user} />
              <Row>
                <Col></Col>
              </Row>
            </Col>
          ))}
      </Row>
      <Row></Row>
    </Container>
  );
};

export default Leadeboard;

{
  /*  {!users && <p> loading </p>}
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
      </Row> */
}
