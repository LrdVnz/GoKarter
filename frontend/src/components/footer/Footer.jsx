import React from "react";
import { Container } from "react-bootstrap";
import { MDBFooter, MDBIcon } from 'mdb-react-ui-kit';
import "./styles.css"

const Footer = (props) => {
  return (
    <MDBFooter bgColor='light' className='text-center text-lg-start text-muted fixed-bottom'>
    <section className='d-flex justify-content-center justify-content-lg-between p-4 border-bottom'>
      <div className='me-5 d-none d-lg-block'>
        <span>Get connected with me on my social networks:</span>
      </div>

      <div>
        <a href='https://www.linkedin.com/in/longo-vincenzo/' className='me-4 text-reset'>
          <MDBIcon fab icon="linkedin" />
        </a>
        <a href='https://github.com/LrdVnz' className='me-4 text-reset'>
          <MDBIcon fab icon="github" />
        </a>
      </div>
    </section>
    </MDBFooter>
  );
};

export default Footer;
