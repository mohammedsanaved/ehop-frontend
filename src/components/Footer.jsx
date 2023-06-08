import { Container, Row, Col } from 'react-bootstrap';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { Link } from 'react-router-dom';
const Footer = () => {
  return (
    <footer>
      <Container>
        <Row>
          <Col className='py-3'>Copyright &copy; E-Shop</Col>
          <Col className='text-center'>
            <Link className='p-3' to={'https://github.com/mohammedsanaved'}>
              <FaGithub style={{ fontSize: '30px' }} />
            </Link>
            <Link
              className='py-3'
              to={'https://www.linkedin.com/in/mohammedsanaved/'}
            >
              <FaLinkedin style={{ fontSize: '30px' }} />
            </Link>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
