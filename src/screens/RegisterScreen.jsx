import { useEffect, useState } from 'react';
import FormContainer from '../components/FormContainer';
import Loader from '../components/Loader';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toastWarn } from '../components/UI/Toast';
import { register } from '../actions/userActions';
// import { toast } from 'react-toastify';
// import { toastError } from '../components/UI/Toast';
const RegisterScreen = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);

  const { loading, userInfo } = userLogin;

  console.log(location);

  //   console.log(userInfo);

  //   const redirect = location.search ? location.search.split('=')[1] : '/';
  //   console.log(window.location);
  useEffect(() => {
    if (userInfo) {
      navigate('/login');
    } else {
      navigate('/register');
    }
  }, [navigate, userInfo]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toastWarn('Both Password are not Match');
    } else {
      dispatch(register(name, email, password));
    }
  };
  return (
    <FormContainer>
      <h1>Sign Up</h1>
      {loading && <Loader />}
      <Form onSubmit={submitHandler}>
        <Form.Group controlId='name'>
          <Form.Label>Name</Form.Label>
          <Form.Control
            className='mb-2'
            type='text'
            value={name}
            placeholder='Enter Your Email'
            onChange={(e) => setName(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId='email'>
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            className='mb-2'
            type='email'
            value={email}
            placeholder='Enter Your Email'
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId='password'>
          <Form.Label>Password</Form.Label>
          <Form.Control
            className='mb-2'
            type='password'
            value={password}
            placeholder='Enter Your Password'
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId='confirmpassword'>
          <Form.Label>ReEnter Password</Form.Label>
          <Form.Control
            className='mb-2'
            type='password'
            value={confirmPassword}
            placeholder='ReEnter Password'
            onChange={(e) => setConfirmPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Button className='mt-2' type='submit' variant='light'>
          Sign Up
        </Button>
      </Form>
      <Row className='py-3'>
        <Col>
          Already Register !
          <Link
            to={'/login'}
            style={{ fontSize: '18px' }}
            // to={redirect ? `/register?redirect= ${redirect}` : '/register'}
          >
            Login
          </Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default RegisterScreen;
