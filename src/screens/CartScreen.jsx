// import React from 'react';
import { useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Row,
  Col,
  ListGroup,
  Form,
  Button,
  Card,
  Image,
} from 'react-bootstrap';
import { addtoCart, removeFromCart } from '../actions/cartActions';
import { toastWarn } from '../components/UI/Toast';
const CartScreen = () => {
  const { id } = useParams();
  console.log(id);
  const navigate = useNavigate();
  const qty = location.search ? Number(location.search.split('=')[1]) : 1;

  console.log(qty);
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const userLogin = useSelector((state) => state.userLogin);

  const { loading, userInfo } = userLogin;
  const { cartItems } = cart;

  console.log(cartItems);
  useEffect(() => {
    dispatch(addtoCart(id, qty));
  }, [dispatch, id, qty]);

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  console.log('userrrrr', userLogin);
  const checkoutHandler = () => {
    if (userInfo) {
      navigate(`/shipping`);
    } else {
      navigate('/login');
      toastWarn('Login or Register First');
    }
  };

  return (
    <Row>
      <Col md={8}>
        <h1>Shopping Cart</h1>
        {cartItems.length === 0 ? (
          <h2>
            Your Cart is Empty
            <Button className='btn ms-3 rounded' variant='light'>
              <Link className='' to='/'>
                Go Back
              </Link>
            </Button>
          </h2>
        ) : (
          <ListGroup varient='flush'>
            {cartItems.map((item) => (
              <ListGroup.Item key={item.product}>
                <Row>
                  <Col md={2}>
                    <Image src={item.image} alt={item.name} fluid />
                  </Col>
                  <Col md={3}>
                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                  </Col>
                  <Col md={2}>${item.price}</Col>
                  <Col md={2}>
                    <Form.Control
                      as='select'
                      value={item.qty}
                      onChange={(e) =>
                        dispatch(
                          addtoCart(item.product, Number(e.target.value))
                        )
                      }
                    >
                      {[...Array(item.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </Form.Control>
                  </Col>
                  <Col md={2}>
                    <Button
                      type='button'
                      variant='light'
                      onClick={() => removeFromCartHandler(item.product)}
                    >
                      <i className='fas fa-trash'></i>
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Col>
      <Col md={4}>
        <Card>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h4>
                SubTotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)})
              </h4>
              $
              {cartItems
                .reduce((acc, item) => acc + item.qty * item.price, 0)
                .toFixed(2)}
              <ListGroup.Item>
                <Button
                  type='button'
                  variant='light'
                  className='btn btn-outline-dark'
                  disabled={cartItems.length === 0}
                  onClick={checkoutHandler}
                >
                  Proceed to CheckOut
                </Button>
              </ListGroup.Item>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
    </Row>
  );
};

export default CartScreen;
