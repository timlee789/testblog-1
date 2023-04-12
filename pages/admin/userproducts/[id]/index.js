import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useReducer, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import Layout from '../../../../components/flyer/layout';
import getError from '../../../../utils/error';

function reducer(state, action) {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true, error: '' };
    case 'FETCH_SUCCESS':
      return { ...state, loading: false, error: '' };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };

    case 'UPDATE_REQUEST':
      return { ...state, loadingUpdate: true, errorUpdate: '' };
    case 'UPDATE_SUCCESS':
      return { ...state, loadingUpdate: false, errorUpdate: '' };
    case 'UPDATE_FAIL':
      return { ...state, loadingUpdate: false, errorUpdate: action.payload };

    case 'UPLOAD_REQUEST':
      return { ...state, loadingUpload: true, errorUpload: '' };
    case 'UPLOAD_SUCCESS':
      return {
        ...state,
        loadingUpload: false,
        errorUpload: '',
      };
    case 'UPLOAD_FAIL':
      return { ...state, loadingUpload: false, errorUpload: action.payload };

    default:
      return state;
  }
}
export default function AdminProductEditScreen() {
  const { query } = useRouter();
  const [simage, setSimage] = useState();
  const [image, setImage] = useState();
  const [productname, setProductname] = useState();
  const productId = query.id;
  const [{ loading, error, loadingUpdate, loadingUpload }, dispatch] =
    useReducer(reducer, {
      loading: true,
      error: '',
    });

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch({ type: 'FETCH_REQUEST' });
        const { data } = await axios.get(`/api/admin/products/${productId}`);
        dispatch({ type: 'FETCH_SUCCESS' });
        setValue('productname', data.productname);
        setValue('listprice', data.listprice);
        setValue('saleprice', data.saleprice);
        setValue('imageField', data.image);
        setValue('description1', data.description1);
        setValue('description2', data.description2);
        setValue('countInStock', data.countInStock);
        setImage(data.image)
        setProductname(data.productname)
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: getError(err) });
      }
    };

    fetchData();
  }, [productId, setValue]);

  const router = useRouter();

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
      setValue(imageField, data.secure_url);
      setSimage(data.secure_url);
      toast.success('File uploaded successfully');
    } catch (err) {
      dispatch({ type: 'UPLOAD_FAIL', payload: getError(err) });
      toast.error(getError(err));
    }
  };

  const submitHandler = async ({
    productname,
    listprice,
    saleprice,
    description1,
    imageField,
    description2,
    countInStock,
  }) => {
    try {
      dispatch({ type: 'UPDATE_REQUEST' });
      await axios.put(`/api/admin/products/${productId}`, {
        productname,
        listprice,
        saleprice,
        description1,
        imageField,
        description2,
        countInStock,
      });
      dispatch({ type: 'UPDATE_SUCCESS' });
      toast.success('Product updated successfully');
      router.push('/admin/products/productedit');
    } catch (err) {
      dispatch({ type: 'UPDATE_FAIL', payload: getError(err) });
      toast.error(getError(err));
    }
  };

  return (
    <Layout title={`Edit Product ${productId}`}>
      <div className="grid md:grid-cols-4 md:gap-5">
        <div className="md:col-span-3">
          {loading ? (
            <div>Loading...</div>
          ) : error ? (
            <div className="alert-error">{error}</div>
          ) : (
            <form
              className="mx-auto max-w-screen-md"
              onSubmit={handleSubmit(submitHandler)}
            >
              <h1 className="mb-4 text-xl">{`Edit Product : ${productname}`}</h1>
              <div className="mb-4">
                <label htmlFor="productname">Product Name</label>
                <input
                  type="text"
                  className="w-full"
                  id="productname"
                  autoFocus
                  {...register('productname', {
                    required: 'Please enter productname',
                  })}
                />
                {errors.productname && (
                  <div className="text-red-500">
                    {errors.productname.message}
                  </div>
                )}
              </div>

              <div className="mb-4">
                <label htmlFor="listprice">List Price</label>
                <input
                  type="text"
                  className="w-full"
                  id="listprice"
                  {...register('listprice', {
                    required: 'Please enter listprice',
                  })}
                />
                {errors.listprice && (
                  <div className="text-red-500">{errors.listprice.message}</div>
                )}
              </div>

              <div className="mb-4">
                <label htmlFor="saleprice">Sale Price</label>
                <input
                  type="text"
                  className="w-full"
                  id="saleprice"
                  {...register('saleprice', {
                    required: 'Please enter saleprice',
                  })}
                />
                {errors.saleprice && (
                  <div className="text-red-500">{errors.saleprice.message}</div>
                )}
              </div>

              <div className="mb-4">
                <label htmlFor="countInStock">Inventory</label>
                <input
                  type="text"
                  className="w-full"
                  id="countInStock"
                  {...register('countInStock', {
                    required: 'Please enter countInStock',
                  })}
                />
                {errors.countInStock && (
                  <div className="text-red-500">{errors.countInStock.message}</div>
                )}
              </div>

              <div className="mb-4">
                <label htmlFor="description1">description1</label>
                <input
                  type="text"
                  className="w-full"
                  id="description1"
                  {...register('description1', {
                    required: 'Please enter description1',
                  })}
                />
                {errors.description1 && (
                  <div className="text-red-500">
                    {errors.description1.message}
                  </div>
                )}
              </div>
              <div className="mb-4">
                <label htmlFor="description2">description2</label>
                <input
                  type="text"
                  className="w-full"
                  id="description2"
                  {...register('description2', {
                    required: 'Please enter description2',
                  })}
                />
                {errors.description2 && (
                  <div className="text-red-500">
                    {errors.description2.message}
                  </div>
                )}
              </div>

             <div>
             <Image src={image} alt='productname' width={300} height={500} /> 
             </div>
              {/* <div className="mb-4">
                <label htmlFor="image">image</label>
                <input
                  type="text"
                  className="w-full"
                  //id="imageField"
                  {...register('imageField', {
                    required: 'Please enter image',
                  })}
                />
                {errors.imageField && (
                  <div className="text-red-500">
                    {errors.imageField.message}
                  </div>
                )}
              </div> */}
             
              <div className="mb-4">
                <label htmlFor="imageFile">Upload image</label>
                <input
                  type="file"
                  className="w-full"
                  id="imageFile"
                  onChange={uploadHandler}
                />

                {loadingUpload && <div>Uploading....</div>}
              </div>
              <div className="mb-4">
                <button disabled={loadingUpdate} className="primary-button">
                  {loadingUpdate ? 'Loading' : 'Update'}
                </button>
              </div>
              <div className="mb-4">
                <Link href={`/admin/productinput`}>Back</Link>
              </div>
            </form>
          )}
        </div>
      </div>
    </Layout>
  );
}

AdminProductEditScreen.auth = { adminOnly: true };
