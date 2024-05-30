import { useState, useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBBtn,
} from "mdb-react-ui-kit";
import { MDBListGroup, MDBListGroupItem } from 'mdb-react-ui-kit';

const Frontpage = (props) => {
  const [races, setRaces] = useState();
  const [isError, setIsError] = useState(false);

  const authorToken = localStorage.getItem("accessToken");

  useEffect(() => {
    getRaces();
  }, []);

  async function getRaces() {
    try {
      const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/race`, {
        headers: {
          Authorization: `Bearer ${authorToken}`,
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
          <MDBCard
            key={`item-${i}`}
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
        ))}
    </Row>
  );
};

export default Frontpage;
