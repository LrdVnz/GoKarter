import "./styles.css";
import { Container, Col, Row } from "react-bootstrap";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import User from "../user/User";

const Leaderboard = () => {
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
  }, []);

  useEffect(() => {
    if (race) {
      setUsers(race["users"]);
    }
  }, [race]);

  useEffect(() => {
    createUserData();
  }, [users]);

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
      users.forEach((current_user, index) => {
        let currentObject = {
          laps: [],
          user: {},
        };

        let currentId = current_user["user"]["_id"];

        let userLaps = laps.filter((lap, a) => {
          if (lap["user"]["_id"] === currentId) {
            return true;
          }
        });

        currentObject.laps = userLaps;
        currentObject.user = current_user["user"];
        userDataArr[`${currentId}`] = currentObject;
      });
      console.log(userDataArr);
      setUserData(userDataArr);
    }
  }

  {
   /*  userData &&
      Object.keys(userData).forEach((item) => {
        console.log(userData[item].user);
      }); */
  }
  return (
    <Container fluid="sm" className="p-2 main">
      <Row>
        {userData &&
          Object.keys(userData).map((user, i) => (
            <Col key={`user-${i}`} className="mt-1 g-0">
              <User {...userData[`${user}`]["user"]} />
              <Row>
                {userData[`${user}`].laps.map((lap, a) => (
                  <Col md={12} key={a}>{lap.time}</Col>
                ))}
              </Row>
            </Col>
          ))}
      </Row>
      <Row></Row>
    </Container>
  );
};

export default Leaderboard;
