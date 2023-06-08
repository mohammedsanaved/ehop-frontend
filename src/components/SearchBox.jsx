import { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const SearchBox = () => {
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState('');
  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/search/${keyword}`);
    } else {
      navigate('/');
    }
  };
  return (
    <Form onSubmit={submitHandler} style={{ display: 'flex' }}>
      <Form.Control
        type='text'
        placeholder='Search Products...'
        className='mr-sm-2 mr-md-5'
        onChange={(e) => setKeyword(e.target.value)}
      ></Form.Control>
      <Button type='submit' className='p-2' variant='dark'>
        Search
      </Button>
    </Form>
  );
};

export default SearchBox;
