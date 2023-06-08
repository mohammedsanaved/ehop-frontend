import { useEffect, useState } from 'react';
import { Col, Row, ListGroup, Image, Card, Button } from 'react-bootstrap';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../components/Loader';
import { toastWarn } from '../components/UI/Toast';
import {
  getOrderDetails,
  payOrder,
  deliverOrders,
} from '../actions/orderActions';
import { server } from '../App';
import {
  ORDER_PAY_RESET,
  ORDER_DELIVER_RESET,
} from '../constants/OrderConstants';
// import { PayPalButtons } from '@paypal/react-paypal-js';
import { PayPalButton } from 'react-paypal-button-v2';

const OrderScreen = () => {
  const { id } = useParams();
  const [sdkReady, setSdkReady] = useState(false);
  const dispatch = useDispatch();

  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, loading, error } = orderDetails; // Add default empty object if OrderCreate is undefined
  console.log(orderDetails);

  const orderPay = useSelector((state) => state.orderPay);
  const { loading: loadingPay, success: successPay } = orderPay;

  const orderDeliver = useSelector((state) => state.orderDeliver);
  const {
    loading: loadingDeliver,
    success: successDeliver,
    error: errorDeliver,
  } = orderDeliver;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  console.log(orderPay);

  if (!loading) {
    //   Calculate prices
    const addDecimals = (num) => {
      return (Math.round(num * 100) / 100).toFixed(2);
    };

    order.itemsPrice = addDecimals(
      order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0)
    );
    console.log(order.itemsPrice);
    console.log(order);
  }
  // console.warn('first itemprice finded');
  useEffect(() => {
    const addPayPalScript = async () => {
      const { data: clientId } = await axios.get(`${server}/api/config/paypal`);
      // console.log(clientId);
      const script = document.createElement('script');

      script.type = 'text/javascript';
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
      script.async = true;
      script.onload = () => {
        setSdkReady(true);
      };
      document.body.appendChild(script);
    };
    if (!order || successPay || successDeliver || order._id !== id) {
      dispatch({ type: ORDER_PAY_RESET });
      dispatch({ type: ORDER_DELIVER_RESET });
      dispatch(getOrderDetails(id));
    } else if (!order.isPaid) {
      if (!window.paypal) {
        addPayPalScript();
      } else {
        setSdkReady(true);
      }
    }
  }, [dispatch, id, successPay, order, successDeliver]);

  const successPaymentHandler = (paymentResult) => {
    dispatch(payOrder(id, paymentResult));
    console.log(paymentResult);
  };
  const deliverHandler = () => {
    dispatch(deliverOrders(order));
  };
  return loading ? (
    <Loader />
  ) : error ? (
    <h3>{error}</h3>
  ) : (
    <>
      <h1>Order-Id {order._id}</h1>
      <Row>
        <Col md={8}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>Shipping Details</h2>
              <p>
                <h5>
                  Name: <strong>{order.user.name}</strong>
                </h5>
                <h5>
                  Email: <strong>{order.user.email}</strong>
                </h5>
                <h5>Address: </h5>
                {order.shippingAddress.address},{order.shippingAddress.city},
                {order.shippingAddress.postalCode},{' '}
                {order.shippingAddress.country}
              </p>
              <h6
                style={{
                  display: 'flex',
                  float: 'right',
                }}
              >
                {order.isDelivered === false ? (
                  <h6
                    style={{
                      color: 'red',
                      backgroundColor: 'yellow',
                      padding: '5px',
                    }}
                  >
                    Not Delivered Yet
                  </h6>
                ) : (
                  <h6
                    style={{
                      color: 'green',
                      backgroundColor: 'yellow',
                      padding: '5px',
                    }}
                  >
                    Delivered
                  </h6>
                )}
              </h6>
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Payment Method</h2>
              <p>
                <h5>Method: </h5>
                {order.paymentMethod}
                <h6
                  style={{
                    display: 'flex',
                    float: 'right',
                  }}
                >
                  {order.isPaid === false ? (
                    <h6
                      style={{
                        color: 'red',
                        backgroundColor: 'yellow',
                        padding: '5px',
                      }}
                    >
                      Not Paid
                    </h6>
                  ) : (
                    <h6
                      style={{
                        color: 'green',
                        backgroundColor: 'yellow',
                        padding: '5px',
                      }}
                    >
                      Paid
                    </h6>
                  )}
                </h6>
              </p>
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Order Items</h2>
              <p>
                {order.orderItems.length === 0 ? (
                  toastWarn('Order is Empty')
                ) : (
                  <ListGroup variant='flush'>
                    {order.orderItems.map((item, index) => (
                      <ListGroup.Item key={index}>
                        <Row>
                          <Col md='1'>
                            <Image src={item.image} alt={item.name} fluid />
                          </Col>
                          <Col>
                            <Link to={`/product/${item.product}`}>
                              {item.name}
                            </Link>
                          </Col>
                          <Col md={4}>
                            {item.qty} x ${item.price} = $
                            {item.qty * item.price}
                          </Col>
                        </Row>
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                )}
              </p>
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Items</Col>
                  <Col>${order.itemsPrice}</Col>
                </Row>
                <Row>
                  <Col>Shipping</Col>
                  <Col>${order.shippingPrice}</Col>
                </Row>
                <Row>
                  <Col>Tax</Col>
                  <Col>${order.taxPrice}</Col>
                </Row>
                <Row>
                  <Col>Total</Col>
                  <Col>${order.totalPrice}</Col>
                </Row>
              </ListGroup.Item>
              {!order.isPaid && (
                <ListGroup.Item>
                  {loadingPay && <Loader />}
                  {!sdkReady ? (
                    <Loader />
                  ) : (
                    <PayPalButton
                      amount={order.totalPrice}
                      onSuccess={successPaymentHandler}
                    />
                  )}
                </ListGroup.Item>
              )}
              {loadingDeliver && <Loader />}
              {errorDeliver && <h3>{errorDeliver}</h3>}
              {userInfo.isAdmin && order.isPaid && !order.isDelivered && (
                <ListGroup.Item>
                  <Button className='btn btn-block' onClick={deliverHandler}>
                    Mark as Delivered
                  </Button>
                </ListGroup.Item>
              )}
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default OrderScreen;
