import React, { SyntheticEvent, useEffect, useState } from 'react';
import axios from 'axios';
import { Button, TextField } from '@material-ui/core';
import Layout from '../../components/Layout';
import { Navigate, useParams } from 'react-router';

const ProductForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [price, setPrice] = useState('');
  const [redirect, setRedirect] = useState(false);
  const { id: product_id } = useParams();

  useEffect(() => {
    if (product_id) {
      (async () => {
        const { data } = await axios.get(`products/${product_id}`);

        setTitle(data.title);
        setDescription(data.description);
        setImage(data.image);
        setPrice(data.price);
      })();
    }
  }, [product_id]);

  const submit = async (e: SyntheticEvent) => {
    e.preventDefault();
    const data = {
      title,
      description,
      image,
      price,
    };

    if (product_id) {
      await axios.put(`products/${product_id}`, data);
    } else {
      await axios.post('products', data);
    }

    setRedirect(true);
  };

  if (redirect) {
    return <Navigate to={'/products'} />;
  }
  return (
    <Layout>
      <form className='mt-3' onSubmit={submit}>
        <div className='mb-3'>
          <TextField
            label='Title'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className='mb-3'>
          <TextField
            label='Description'
            rows={4}
            multiline={true}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className='mb-3'>
          <TextField
            label='Image'
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
        </div>
        <div className='mb-3'>
          <TextField
            label='Price'
            type='number'
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        <Button variant='contained' color='primary' type='submit'>
          Submit
        </Button>
      </form>
    </Layout>
  );
};

export default ProductForm;
