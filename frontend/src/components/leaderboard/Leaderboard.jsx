import "./styles.css";
import { Container, Col, Row } from "react-bootstrap";
import { useState, useEffect } from "react";

const Leadeboard = () => {
   
    const [ users, setUsers ] = useState()
    const [isError, setIsError ] = useState()

    useEffect(() => {
        getUsers(); 
    })
    
    async function getUsers() {
        try {
          const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}`)
          // Per ora senza autorizzazione

          const json = await res.json()

          if (json) {
            setUsers(json)
          }

        } catch(err) {
           console.log(err)
        }
    }

    return ( 
        <Container>
            <Row>
                {/* UsersRow */}
              { !users && <p> loading </p> }

              { users && 
                users.map((user, i) => (
                    <Col
                    key={`user-${i}`}
                    >
                     Prova

                    </Col>
                ))
              
              }
            </Row>
            <Row>
                {/* LapsRow */}


            </Row>
          

        </Container>
     );
}
 
export default Leadeboard;