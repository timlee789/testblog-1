import axios from 'axios';
import React, { useEffect, useReducer } from 'react';
//import Link from 'next/link';
import Layout from '../../../components/flyer/layout';
import getError from '../../../utils/error';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
//import Image from 'next/image';
import { useRouter } from 'next/router';

function reducer(state, action) {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true, error: '' };
    case 'FETCH_SUCCESS':
      return { ...state, loading: false, category: action.payload, error: '' };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
}

export default function AdminProductScreen() {
  const [{ loading, error, category }, dispatch] = useReducer(reducer, {
    loading: true,
    category: [],
    error: '',
  });

  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
  } = useForm();
  const router = useRouter();
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        dispatch({ type: 'FETCH_REQUEST' });
        const { data } = await axios.get('/api/menu/menulist');
        dispatch({ type: 'FETCH_SUCCESS', payload: data });
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: getError(err) });
      }
    };
    fetchOrders();
  }, []);

  const submitHandler = async ({
    productname,
    listprice,
    saleprice,
    stock,
    description1,
    description2,
    imageField,
    //category,
  }) => {
    try {
      console.log(description1, productname);
      await axios.post('/api/product/productregister', {
        productname,
        listprice,
        saleprice,
        stock,
        description1,
        description2,
        imageField,
        //category,
      });
      router.push('/admin/products/productedit');
      // if (result.error) {
      //   toast.error(result.error);
      // }
    } catch (err) {
      toast.error(getError(err));
    }
  };

 
  const uploadHandler = async (e, imageField = 'image') => {
    const url = `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/upload`;
    try {
      dispatch({ type: 'UPLOAD_REQUEST' });
      const {
        data: { signature, timestamp },
      } = await axios('/api/admin/cloudinary-sign');

      const file = e.target.files[0];
      const formData = new FormData();
      formData.append('file', file);
      formData.append('signature', signature);
      formData.append('timestamp', timestamp);
      formData.append('api_key', process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY);
      const { data } = await axios.post(url, formData);
      dispatch({ type: 'UPLOAD_SUCCESS' });
      setValue('imageField', data.secure_url);
      toast.success('File uploaded successfully');
    } catch (err) {
      dispatch({ type: 'UPLOAD_FAIL', payload: getError(err) });
      toast.error(getError(err));
    }
  };
  return (
    <Layout title="Order History">
      <h1 className="mb-4 text-xl text-black">Product Registration</h1>

      <form
        className="mx-auto max-w-screen-md"
        onSubmit={handleSubmit(submitHandler)}
      >
         {/* <select {...register("category")}>
          {category.map((cat) => (
             <option value={cat.category}>{cat.category}</option>
          ))}
      </select> */}

        <div className="mb-4 text-black px-4">
          <label htmlFor="productname text-black">productname</label>
          <input
            type="text"
            {...register('productname', {
              required: 'Please enter productname',
            })}
            className="w-full"
            id="productname"
            autoFocus
          ></input>
          {errors.productname && (
            <div className="text-red-500">{errors.productname.message}</div>
          )}
        </div>
        <div className="mb-4 text-black px-4">
          <label htmlFor="listprice text-black">List Price</label>
          <input
            type="listprice"
            {...register('listprice', { required: 'Please enter listprice' })}
            className="w-full"
            id="listprice"
          ></input>
          {errors.listprice && (
            <div className="text-red-500 ">{errors.listprice.message}</div>
          )}
        </div>
        <div className="mb-4 text-black px-4">
          <label htmlFor="saleprice text-black">Sale Price</label>
          <input
            type="saleprice"
            {...register('saleprice', { required: 'Please enter saleprice' })}
            className="w-full"
            id="saleprice"
          ></input>
          {errors.saleprice && (
            <div className="text-red-500">{errors.saleprice.message}</div>
          )}
        </div>
        <div className="mb-4 text-black px-4">
          <label htmlFor="stock text-black">stock</label>
          <input
            type="stock"
            {...register('stock', { required: 'Please enter stock' })}
            className="w-full"
            id="stock"
          ></input>
          {errors.stock && (
            <div className="text-red-500">{errors.stock.message}</div>
          )}
        </div>
        <div className="mb-4 text-black px-4">
          <label htmlFor="description1 text-black">description1</label>
          <input
            type="text"
            {...register('description1', {
              required: 'Please enter description1',
            })}
            className="w-full"
            id="description1"
            autoFocus
          ></input>
          {errors.description1 && (
            <div className="text-red-500"> {errors.description1.message}</div>
          )}
        </div>

        <div className="mb-4 text-black px-4">
          <label htmlFor="description2 text-black">description2</label>
          <input
            type="text"
            {...register('description2', {
              required: 'Please enter description2',
            })}
            className="w-full"
            id="description2"
            autoFocus
          ></input>
          {errors.description2 && (
            <div className="text-red-500"> {errors.description2.message}</div>
          )}
        </div>

        <div className="mb-4 text-black px-4">
          <label htmlFor="image"></label>
          <input
            type="text"
            className="w-full"
            id="imageField"
            hidden={true}
            {...register('imageField', {
              required: 'Please enter image',
            })}
          />
          {errors.imageField && (
            <div className="text-red-500">{errors.imageField.message}</div>
          )}
        </div>
        <div className="mb-4 text-black px-4">
          <label htmlFor="imageFile">Upload image</label>
          <input
            type="file"
            className="w-full"
            id="imageFile"
            onChange={uploadHandler}
          />

          {loading && <div>Uploading....</div>}
        </div>

        <div className="mb-4 pl-10">
          <button className="primary-button">Register</button>
        </div>
      </form>

   
    </Layout>
  );
}
AdminProductScreen.auth = {adminOnly: true};
