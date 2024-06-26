import "./styles.css";
import { Container, Col, Row, Form } from "react-bootstrap";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import User from "../user/User";
import { MDBListGroup, MDBListGroupItem, MDBBtn } from "mdb-react-ui-kit";

const Leaderboard = () => {
  const [users, setUsers] = useState();
  const [isError, setIsError] = useState(false);
  const [race, setRace] = useState();
  const [laps, setLaps] = useState();
  const [userData, setUserData] = useState();
  const [sortedData, setSortedData] = useState();
  const [currentUser, setCurrentUser] = useState();

  const [userToken] = useState(localStorage.getItem("accessToken"));

  const params = useParams();
  const { id } = params;

  useEffect(() => {
    setCurrentUser(JSON.parse(localStorage.getItem("currentUser")));
  }, []);

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

  async function handleAddLap(event) {
    /// servono race, user e time
    event.preventDefault();
    console.log(event);
    //per accedere a user id  console.log(event.target.elements[2].value)
     let formBody = {
      race: id,
      user: event.target.elements[2].value,
      time: event.target.elements[0].value,
    };
    console.log(JSON.stringify(formBody));

    const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/lap/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userToken}`,
      },
      body: JSON.stringify(formBody),
    });

    window.location.reload();
  }

  async function handleAddUser(event) {
    event.preventDefault();

    let newUser = { user: currentUser._id };
    let updatedUsers = [];
    updatedUsers.push(...race["users"]);
    let alreadyPresent = updatedUsers.includes(newUser);
    if (!alreadyPresent) {
      updatedUsers.push(newUser);
      window.location.reload();
    } else {
      alert("user already present in the race");
    }

    let formBody = {
      users: updatedUsers,
    };

    const res = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/race/${id}/users`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userToken}`,
        },
        body: JSON.stringify(formBody),
      }
    );
  }

  async function getRace() {
    try {
      const res = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/race/${id}`,
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );
      // Per ora senza autorizzazione

      if (res.status == 401) {
        setIsError(true);
      }

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
      const res = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/lap/${id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userToken}`,
          },
        }
      );
      // Per ora senza autorizzazione

      const json = await res.json();

      if (json) {
        setLaps(json);
      }
    } catch (err) {
      console.log(err);
    }
  }

  async function handleDeleteLap(event) {
    event.preventDefault();
    console.log(event)
    console.log(event.target[1].value)

    const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/lap/${event.target[1].value}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${userToken}`,
      }
    });

    window.location.reload(); 
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
      return a.avg - b.avg;
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

  function controlUser() {
    let result = false;

    Object.keys(race["users"]).forEach((key, i) => {
      /* console.log("currently checking race user : ");
      console.log(race["users"][key]["user"]);
      console.log("current user is :");
      console.log(currentUser); */
      if (currentUser._id === race["users"][key]["user"]._id) {
        result = true;
      }
    });
    return result;
  }

  return (
    <Container fluid="sm" className="p-2 main">
      {isError && <h2>401 unauthorized. Please log in</h2>}

      {!isError && (
        <Row className="leaderboard-main">
          {sortedData &&
            sortedData.map((userObj, i) => (
              <Col key={`user-${i}`} className="mt-1 g-0 user-column">
                <User {...userObj.user} />
                <MDBListGroup className="laps-list">
                  {userObj.laps.map((lap, a) => (
                    <Form onSubmit={handleDeleteLap}>
                      <Form.Group>
                        <MDBListGroupItem className="custom-text inner">{lap.time}</MDBListGroupItem>
                      {/* Rovina tutto il design della leaderboard.  
                        {userObj.user._id == currentUser._id && (
                          <Form.Group>
                            <MDBBtn type="submit" className="btn-custom laps">
                              delete lap
                            </MDBBtn>
                            <Form.Control controlId="lap-delete-id" type="input" disabled style={{display:"none"}} value={lap._id}/>
                          </Form.Group>
                        )} */}
                      </Form.Group>
                    </Form>
                  ))}
                  <Form onSubmit={handleAddLap}>
                    <Form.Group>
                      {userObj.user._id == currentUser._id && (
                        <Form.Group>
                          <Form.Control controlId="lap-time" type="input"  />
                          <MDBBtn type="submit" className="btn-custom button-text laps">
                            Add Lap Time
                          </MDBBtn>
                        </Form.Group>
                      )}
                      <Form.Control
                        controlId="lap-user"
                        type=""
                        value={userObj.user._id}
                        disabled
                        style={{ display: "none" }}
                      ></Form.Control>
                    </Form.Group>
                  </Form>
                </MDBListGroup>
              </Col>
            ))}
          {/* User adding space, to check if user is already present*/}
          {race && !controlUser() && (
            <Col className="mt-1 g-0 user-column">
              <Form onSubmit={handleAddUser}>
                <MDBBtn type="submit" className="btn-custom button-text">
                  Add Yourself in the race
                </MDBBtn>
              </Form>
            </Col>
          )}
        </Row>
      )}
    </Container>
  );
};

export default Leaderboard;
