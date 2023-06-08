import { useEffect } from 'react';
import Loader from '../components/Loader';
import { Col, Row } from 'react-bootstrap';
import Product from '../components/Products';
import Paginate from '../components/Paginate';
import { listProducts } from '../actions/productActions';
import { useDispatch, useSelector } from 'react-redux';
('../actions/productActions.js');
import { Link, useParams } from 'react-router-dom';
import ProductCarousel from '../components/ProductCarousel';
import Meta from '../components/Meta';
import { toastError } from '../components/UI/Toast';
const HomeScreen = () => {
  const { keyword } = useParams();
  const { pageNumber } = useParams();
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);

  const { loading, error, products, page, pages } = productList;
  console.log(productList);

  useEffect(() => {
    dispatch(listProducts(keyword, pageNumber));
  }, [dispatch, keyword, pageNumber]);
  return (
    <>
      <Meta />
      {!keyword ? (
        <ProductCarousel />
      ) : (
        <Link to={'/'} className='btn btn-light'>
          {' '}
          Go Back
        </Link>
      )}
      {loading ? (
        <Loader />
      ) : error ? (
        toastError(error)
      ) : (
        <>
          <Row>
            <h1>Latest Products</h1>
            {products.map((product) => (
              <Col key={product._id} sm={12} md={6} xl={3}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
          <Paginate
            pages={pages}
            page={page}
            keyword={keyword ? keyword : ''}
          />
        </>
      )}
    </>
  );
};

export default HomeScreen;
