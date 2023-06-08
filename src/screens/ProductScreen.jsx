import { useEffect, useState } from 'react';
import {
  Button,
  Card,
  Col,
  Form,
  Image,
  ListGroup,
  Row,
} from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Rating from '../components/Rating';
import {
  listProductsDetails,
  productCreateReview,
} from '../actions/productActions';
import { PRODUCT_CREATE_REVIEW_RESET } from '../constants/ProductConstants';
import Loader from '../components/Loader';
import { toastError, toastSuccess } from '../components/UI/Toast';
import Meta from '../components/Meta';
const ProductScreen = () => {
  const navigate = useNavigate();
  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const { id } = useParams();
  console.log(id);
  const dispatch = useDispatch();
  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;
  console.log(product);
  // console.log(productDetails);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const productReviewCreate = useSelector((state) => state.productReviewCreate);
  const { success: successProductReview, error: errorProductReview } =
    productReviewCreate;
  useEffect(() => {
    if (successProductReview) {
      toastSuccess('Review Submitted');
      setRating(0);
      setComment('');
      dispatch({ type: PRODUCT_CREATE_REVIEW_RESET });
    }
    dispatch(listProductsDetails(id));
  }, [dispatch, id, successProductReview]);
  const addToCartHandler = () => {
    navigate(`/cart/${id}?qty=${qty}`);
  };
  //SubmitHandler to create a review
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      productCreateReview(id, {
        rating,
        comment,
      })
    );
  };

  return (
    <>
      <Link to={'/'} className='btn btn-dark my-3'>
        Go Back
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        toastError({ error })
      ) : (
        <>
          <Meta title={product.name} />
          <Row>
            <Col md={6}>
              <Image src={product.image} alt={product.name} fluid />
            </Col>
            <Col md={3}>
              <ListGroup variant='flush'>
                <ListGroup.Item>
                  <strong>Name:</strong> {product.name}
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>Price:</strong> $ {product.price}
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>Rating:</strong>
                  <Rating
                    value={product.rating}
                    text={`${product.numReviews}`}
                  />
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>Category:</strong> {product.category}
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>Description:</strong> {product.description}
                </ListGroup.Item>
              </ListGroup>
            </Col>
            <Col md={3}>
              <Card>
                <ListGroup variant='flush'>
                  <ListGroup.Item>
                    <Row>
                      <Col>Price: </Col>
                      <Col>
                        <strong>$ {product.price}</strong>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Status: </Col>
                      <Col>
                        {product.countInStock > 0 ? 'In Stock ' : 'OUT Stock '}
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  {product.countInStock > 0 && (
                    <ListGroup.Item>
                      <Row>
                        <Col>Qty</Col>
                        <Col>
                          <Form.Control
                            as='select'
                            value={qty}
                            onChange={(e) => setQty(Number(e.target.value))}
                          >
                            {[...Array(product.countInStock).keys()].map(
                              (x) => (
                                <option key={x + 1} value={x + 1}>
                                  {x + 1}
                                </option>
                              )
                            )}
                          </Form.Control>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  )}
                  <ListGroup.Item>
                    <Button
                      onClick={addToCartHandler}
                      type='button'
                      className='btn btn-dark'
                      disabled={product.countInStock === 0}
                    >
                      Add to Cart
                    </Button>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <h3>Reviews</h3>
              {product.reviews && product.reviews.length === 0 && (
                <h3>No Reviews Yet</h3>
              )}

              <ListGroup>
                {product.reviews &&
                  product.reviews.map((review) => (
                    <ListGroup.Item key={review._id}>
                      <strong>{review.name}</strong>
                      <Rating value={review.rating} />
                      <p>{review.createdAt}</p>
                      <p>{review.comment}</p>
                    </ListGroup.Item>
                  ))}
                <ListGroup.Item>
                  <h2>Write a review here</h2>
                  {errorProductReview && (
                    <h4 style={{ backgroundColor: 'red', padding: '3px' }}>
                      {errorProductReview}
                    </h4>
                  )}

                  {userInfo ? (
                    <Form onSubmit={submitHandler}>
                      {/* ----------------------For Rating Section-------------------- */}
                      <Form.Group controlId='rating'>
                        <Form.Label>Rating</Form.Label>
                        <Form.Control
                          as='select'
                          value={rating}
                          onChange={(e) => setRating(e.target.value)}
                        >
                          <option value=''>Select...</option>
                          <option value='1'>1 - Poor</option>
                          <option value='2'>2 - Fair</option>
                          <option value='3'>3 - Good</option>
                          <option value='4'>4 - Very Good</option>
                          <option value='5'>5 - Excellent</option>
                        </Form.Control>
                      </Form.Group>
                      {/* ----------------------For Comment Section-------------------- */}
                      <Form.Group controlId='comment'>
                        <Form.Label>Comment</Form.Label>
                        <Form.Control
                          as='textarea'
                          row='3'
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                        ></Form.Control>
                      </Form.Group>
                      <Button
                        variant='primary'
                        type='submit'
                        style={{ marginTop: '3px' }}
                      >
                        Submit
                      </Button>
                    </Form>
                  ) : (
                    <h3>
                      Please<Link to={'/login'}>to SignUp </Link>to post a
                      review
                    </h3>
                  )}
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
        </>
      )}
    </>
  );
};

export default ProductScreen;
