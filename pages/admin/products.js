import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useReducer } from 'react';
import { toast } from 'react-toastify';
//import { toToastItem } from 'react-toastify/dist/utils';
import Layout from '../../components/layout';
import getError from '../../utils/error';

function reducer(state, action) {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true, error: '' };
    case 'FETCH_SUCCESS':
      return { ...state, loading: false, products: action.payload, error: '' };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    case 'CREATE_REQUEST':
      return { ...state, loadingCreate: true };
    case 'CREATE_SUCCESS':
      return { ...state, loadingCreate: false };
    case 'CREATE_FAIL':
      return { ...state, loadingCreate: false };
    case 'DELETE_REQUEST':
      return { ...state, loadingDelete: true };
    case 'DELETE_SUCCESS':
      return { ...state, loadingDelete: false, successDelete: true };
    case 'DELETE_FAIL':
      return { ...state, loadingDelete: false };
    case 'DELETE_RESET':
      return { ...state, loadingDelete: false, successDelete: false };

    default:
      state;
  }
}
export default function AdminProdcutsScreen() {
  const router = useRouter();

  const [
    { loading, error, products, loadingCreate, successDelete, loadingDelete },
    dispatch,
  ] = useReducer(reducer, {
    loading: true,
    products: [],
    error: '',
  });

  const createHandler = async () => {
    if (!window.confirm('Are you sure?')) {
      return;
    }
    try {
      dispatch({ type: 'CREATE_REQUEST' });
      const { data } = await axios.post(`/api/admin/products`);
      dispatch({ type: 'CREATE_SUCCESS' });
      toast.success('Product created successfully');
      router.push(`/admin/product/${data.product._id}`);
    } catch (err) {
      dispatch({ type: 'CREATE_FAIL' });
      toast.error(getError(err));
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch({ type: 'FETCH_REQUEST' });
        const { data } = await axios.get(`/api/admin/products`);
        dispatch({ type: 'FETCH_SUCCESS', payload: data });
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: getError(err) });
      }
    };

    if (successDelete) {
      dispatch({ type: 'DELETE_RESET' });
    } else {
      fetchData();
    }
  }, [successDelete]);

  const deleteHandler = async (productId) => {
    if (!window.confirm('Are you sure?')) {
      return;
    }
    try {
      dispatch({ type: 'DELETE_REQUEST' });
      await axios.delete(`/api/admin/products/${productId}`);
      dispatch({ type: 'DELETE_SUCCESS' });
      toast.success('Product deleted successfully');
    } catch (err) {
      dispatch({ type: 'DELETE_FAIL' });
      toast.error(getError(err));
    }
  };
  return (
    <Layout title="Admin Products">
      <div className="grid md:grid-cols-4 md:gap-5">
        <div>
          <ul>
            <li>
              <Link href="/admin/dashboard">Dashboard</Link>
            </li>
            <li>
              <Link href="/admin/orders">Orders</Link>
            </li>
            <li>
              <Link href="/admin/products">
                <div className="font-bold">Products</div>
              </Link>
            </li>
            <li>
              <Link href="/admin/users">Users</Link>
            </li>
          </ul>
        </div>
        <div className="overflow-x-auto md:col-span-3">
          <div className="flex justify-between">
            <h1 className="mb-4 text-xl">Products</h1>
            {loadingDelete && <div>Deleting item...</div>}
            <button
              disabled={loadingCreate}
              onClick={createHandler}
              className="primary-button"
            >
              {loadingCreate ? 'Loading' : 'Create'}
            </button>
          </div>
          {loading ? (
            <div>Loading...</div>
          ) : error ? (
            <div className="alert-error">{error}</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead className="border-b">
                  <tr>
                    <th className="px-5 text-left">ID</th>
                    <th className="p-5 text-left">PRODUCT NAME</th>
                    <th className="p-5 text-left">PRICE</th>
                    <th className="p-5 text-left">DESCRIPTION1</th>
                    <th className="p-5 text-left">DESCRIPTION2</th>
                    <th className="p-5 text-left">IMAGE</th>
                    <th className="p-5 text-left">ACTIONS</th>
                  </tr>
                </thead>

                {products.map((prod, index) => (
                  <tbody key={index}>
                    {prod.product.map((subprod) => (
                      <tr key={subprod._id} className="border-b">
                        <td className=" p-5 ">
                          {subprod._id.substring(20, 24)}
                        </td>
                        <td className=" p-5 ">{subprod.productname}</td>
                        <td className=" p-5 ">${subprod.price}</td>
                        <td className=" p-5 ">{subprod.description1}</td>
                        <td className=" p-5 ">{subprod.description2}</td>
                        <td className=" p-5 ">
                          <Image
                            src={subprod.image}
                            alt={subprod.productname}
                            width={100}
                            height={100}
                          />
                        </td>
                        <td className=" p-5 ">
                          <Link href={`/admin/products/${subprod._id}`}>
                            <a type="button" className="default-button">
                              Edit
                            </a>
                          </Link>
                          &nbsp;
                          <button
                            onClick={() => deleteHandler(product._id)}
                            className="default-button"
                            type="button"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                ))}
              </table>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}

AdminProdcutsScreen.auth = { adminOnly: true };