import axios from 'axios';
import React, { useEffect, useReducer } from 'react';
import Link from 'next/link';
import { getSession } from 'next-auth/react';
import { toast } from 'react-toastify';
import Image from 'next/image';
import { useRouter } from 'next/router';
import Layout from '../../../components/flyer/layout';
import getError from '../../../utils/error';

function reducer(state, action) {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true, error: '' };
    case 'FETCH_SUCCESS':
      return { ...state, loading: false, menus: action.payload, error: '' };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
}

export default function MenuEdit() {

  const session = getSession();
  const { user } = session;

  const [{ loading, error, menus }, dispatch] = useReducer(reducer, {
    loading: true,
    menus: [],
    error: '',
  });


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

  

  const deleteHandler = async (menuId) => {
    if (!window.confirm('Are you sure?')) {
      return;
    }
    try {
      await axios.delete(`/api/menu/${menuId}`);

      toast.success('Menu deleted successfully');
      router.push('/admin/menu/menuedit');
    } catch (err) {
      toast.error(getError(err));
    }
  };
  
  return (
    <Layout>
    <div>
    

      <h1 className="mb-4 text-xl">Menu List</h1>
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div className="alert-error">{error}</div>
      ) : (
        <div className="overflow-x-auto">
          <div className=" justify-center flex-wrap">
           
            {menus.map((cat) => (
              <div key={cat._id} className='flex justify-center'>
                <div className="border-b  className='flex justify-center'">
               
                  <div className="text-center text-blue-500 ">{cat.category}</div>
                  <div >
                  <div className=" font-bold text-center "> {cat.description}</div>
                  </div>
                  <div >
                  {/* <div className=" p-2 ">
                    <Link href={`/admin/userproducts/${cat._id}`}>
                      <div type="button" className="default-button">
                        Edit
                      </div>
                    </Link>
                    &nbsp;
                  </div> */}
                  <div className="p-2 ml-40">
                    <a>
                      <button
                        onClick={() => deleteHandler(cat._id)}
                        className="default-button"
                      >
                        Delete
                      </button>
                    </a>
                  </div>
                  </div>
                </div>
              </div>
            ))}

          </div>
        </div>
      )}
  </div>
  </Layout>
  );
}

