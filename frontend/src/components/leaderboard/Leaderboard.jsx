import "./styles.css";
import { Container, Col, Row } from "react-bootstrap";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import User from "../user/User";
import { MDBListGroup, MDBListGroupItem } from "mdb-react-ui-kit";

const Leaderboard = () => {
  const [users, setUsers] = useState();
  const [isError, setIsError] = useState();
  const [race, setRace] = useState();
  const [laps, setLaps] = useState();
  const [userData, setUserData] = useState();
  const [sortedData, setSortedData] = useState();

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
    const userDataObj = {
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
        userDataObj[`${currentId}`] = currentObject;
      });
      console.log(userDataObj);
      sortUserData(userDataObj);
      setUserData(userDataObj);
    }
  }

  function sortUserData(data) {
    let usersKeys = Object.keys(data);

    let sortedData = [];

    usersKeys.forEach((userKey, i) => {
      let sum = data[userKey].laps.reduce((acc, item) => {
        return (acc += parseInt(item.time));
      }, 0);
      let avg = sum / data[userKey].laps.length;

      data[userKey]["avg"] = avg;
      sortedData.push(data[userKey]);
    });

    sortedData.sort(function (a, b) {
      return b.avg - a.avg;
    });

    setSortedData(sortedData);
    // accessing one lap :
    // data[usersKeys[0]].laps[0].time
  }

  {
    /*  userData &&
      Object.keys(userData).forEach((item) => {
        console.log(userData[item].user);
      }); */
  }
  return (
    <Container fluid="sm" className="p-2 main">
      <Row className="leaderboard-main">
        {sortedData &&
          sortedData.map((userObj, i) => (
            <Col key={`user-${i}`} className="mt-1 g-0 user-column">
              <User {...userObj.user} />
              <MDBListGroup className="laps-list">
                {userObj.laps.map((lap, a) => (
                  <MDBListGroupItem>{lap.time}</MDBListGroupItem>
                ))}
              </MDBListGroup>
            </Col>
          ))}
      </Row>
    </Container>
  );
};

export default Leaderboard;
