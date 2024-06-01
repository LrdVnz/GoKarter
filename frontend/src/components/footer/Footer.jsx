import React from "react";
import { Container } from "react-bootstrap";
import "./styles.css"

const Footer = (props) => {
  return (
    <footer
    >
      <Container>
        <span>
          {`${new Date().getFullYear()} GoKarter - A leaderboard for go kart races`}
        </span>
        <span>
          <p><a href="https://github.com/LrdVnz">My github</a></p>
        </span>
      </Container>
    </footer>
  );
};

export default Footer;
