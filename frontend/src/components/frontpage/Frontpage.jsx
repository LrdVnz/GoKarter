import { useState, useEffect } from "react";
import { Col, Row } from "react-bootstrap";

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
          <Col
            key={`item-${i}`}
            md={4}
            style={{
              marginBottom: 50,
            }}
          >
            {/* To do : put the race in a card */}
            {/* Race item is clickable and bring you to the race. */}
            <div>{race.date}</div>
            <div> partecipants :</div>
            <ul>
              {race.users.map((user, a) => (
                /* per accedere al nome : user[0].user.name */
                <li key={`user-${a}`}>{user.user.name}</li>
              ))} 
            </ul>
          </Col>
        ))}
    </Row>
  );
};

export default Frontpage;
