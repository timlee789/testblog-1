import axios from 'axios';
import React, { useEffect, useReducer } from 'react';
import Link from 'next/link';
import Layout from '../../../components/layout';
import getError from '../../../utils/error';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import Image from 'next/image';
import { useRouter } from 'next/router';

function reducer(state, action) {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true, error: '' };
    case 'FETCH_SUCCESS':
      return { ...state, loading: false, products: action.payload, error: '' };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
}

export default function AdminProductScreen() {
  const [{ loading, error, products }, dispatch] = useReducer(reducer, {
    loading: true,
    products: [],
    error: '',
  });

  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
  } = useForm();
  const router = useRouter();
  
  const submitHandler = async ({
    category,
    description,
  }) => {
    try {
      
      await axios.post('/api/menu/menuregister', {
       category,
       description,
      });
      router.push('/admin/menu/menuedit');
      // if (result.error) {
      //   toast.error(result.error);
      // }
    } catch (err) {
      toast.error(getError(err));
    }
  };

 
 
  return (
    <Layout title="Menu Registration">
      <h1 className="mb-4 text-xl">Menu Registration</h1>

      <form
        className="mx-auto max-w-screen-md"
        onSubmit={handleSubmit(submitHandler)}
      >
        <div className="mb-4">
          <label htmlFor="category">Category</label>
          <input
            type="text"
            {...register('category', {
              required: 'Please enter category',
            })}
            className="w-full"
            id="category"
            autoFocus
          ></input>
          {errors.category && (
            <div className="text-red-500">{errors.category.message}</div>
          )}
        </div>
       
          {errors.description1 && (
            <div className="text-red-500"> {errors.description1.message}</div>
          )}
       

        <div className="mb-4">
          <label htmlFor="description">description</label>
          <input
            type="text"
            {...register('description', {
              required: 'Please enter description',
            })}
            className="w-full"
            id="description"
            autoFocus
          ></input>
          {errors.description && (
            <div className="text-red-500"> {errors.description.message}</div>
          )}
        </div>

      


        <div className="mb-4">
          <button className="primary-button">Register</button>
        </div>
      </form>

   
    </Layout>
  );
}
AdminProductScreen.auth = {adminOnly: true};
