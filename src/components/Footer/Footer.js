import React from 'react';
import {Container} from 'react-bootstrap';

const Footer = () => {
  return (
    <footer className="footer mt-auto py-3 bg-dark d-print-none">
      <Container className="d-flex justify-content-between text-center text-light">
        <span>
            Fun Math App by Miran
        </span>
      </Container>
    </footer>
  );
};

export default Footer;
