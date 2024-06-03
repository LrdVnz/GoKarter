import { useState, useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBListGroup,
  MDBListGroupItem,
} from "mdb-react-ui-kit";
import { Link } from "react-router-dom";

const Frontpage = (props) => {
  const [races, setRaces] = useState();
  const [isError, setIsError] = useState(false);
  const [userToken] = useState(
    localStorage.getItem("accessToken")
  );

  useEffect(() => {
    getRaces();
  }, []);

  async function getRaces() {
    try {
      const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/race`, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });

      if (res.status == 401) {
        setIsError(true);
      }

      const json = await res.json();

      if (json) {
        setRaces(json);
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <Row className="main">
      {!races && !isError && <p> loading </p>}

      {isError && <h2>401 unauthorized. Please log in</h2>}

      {races &&
        races.map((race, i) => (
          <Link
            to={`/race/${race._id}`}
            key={`item-${i}`}
            className="race-link"
          >
            <MDBCard
              md={4}
              style={{
                marginBottom: 50,
              }}
            >
              <MDBCardBody>
                {/* To do : put the race in a card */}
                {/* Race item is clickable and bring you to the race. */}
                <MDBCardTitle>{race.date}</MDBCardTitle>
                <MDBCardText> partecipants :</MDBCardText>
                <MDBListGroup>
                  {race.users.map((user, a) => (
                    /* per accedere al nome : user[0].user.name */
                    <MDBListGroupItem key={`user-${a}`}>
                      <MDBCardText>{user.user.name}</MDBCardText>
                    </MDBListGroupItem>
                  ))}
                </MDBListGroup>
              </MDBCardBody>
            </MDBCard>
          </Link>
        ))}
    </Row>
  );
};

export default Frontpage;
