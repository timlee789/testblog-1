import axios from 'axios';
import React, { useEffect, useReducer } from 'react';
import Link from 'next/link';
import { getSession } from 'next-auth/react';
import { toast } from 'react-toastify';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

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

export default function Productpage() {

  const session = getSession();
  const { user } = session;

  const [{ loading, error, products }, dispatch] = useReducer(reducer, {
    loading: true,
    products: [],
    error: '',
  });


  const router = useRouter();
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        dispatch({ type: 'FETCH_REQUEST' });
        const { data } = await axios.get('/api/product/productlist');
        dispatch({ type: 'FETCH_SUCCESS', payload: data });
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: getError(err) });
      }
    };
    fetchOrders();
  }, []);

  

  const deleteHandler = async (productId) => {
    if (!window.confirm('Are you sure?')) {
      return;
    }
    try {
      await axios.delete(`/api/admin/products/${productId}`);

      toast.success('Product deleted successfully');
      router.push('/productlist');
    } catch (err) {
      toast.error(getError(err));
    }
  };
  
  return (
    <div>
      <h1 className="mb-4 text-lg">Product List</h1>
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div className="alert-error">{error}</div>
      ) : (
        <div className="overflow-x-auto">
          <div className="flex justify-center flex-wrap mobile:grid grid-cols-2 p-2 gap-2 laptop:grid-cols-4 p-2 gap-2 ml-auto mr-auto">
           
            {products.map((order) => (
              <div key={order._id}>
                <div>
                <div className="flex justify-center card ">
         <Carousel showArrows={true} showThumbs={false} swipeable={true} autoPlay >
        <div className='mobile:h-64 laptop:h-128'>
          <Image
            src={order.image}
            alt="banner"
            width={200}
            height={240}
            className="mobile:element1 laptop:element2"
          />
          </div>
        <div className='mobile:h-64 laptop:h-128'>
          <Image
            src={order.image}
            alt="banner"
            width={200}
            height={240}
            className="mobile:element1 laptop:element2"
          />
          </div>
        <div className='mobile:h-64 laptop:h-128'>
          <Image
            src={order.image}
            alt="banner"
            width={200}
            height={240}
            className="mobile:element1 laptop:element2"
          />
          </div>
        <div className='mobile:h-64 laptop:h-128'>
          <Image
            src={order.image}
            alt="banner"
            width={200}
            height={240}
            className="mobile:element1 laptop:element2"
          />
          </div>
          
        </Carousel>
      </div>
            <div className="bg-slate-100 mb-6 text-center h-52">
              <div className='flex justify-center  '>
              <div className="text-xs text-red-800 line-through"> U$: {order.listprice}</div> &nbsp;&nbsp;&nbsp;
              <div className="font-bold text-sm">sale U$: {order.saleprice}</div>
              </div>
              <div>{order.description}</div>
              <div className="mobile:font-bold text-xs text-blue-800 mb-4 mt-2">{order.description1}</div>
              <div className='text-xs h-20'>{order.productname}</div> 
              
              <div className= 'mobile:flex flex-col-2 justify-center mx-2 laptop:flex justify-between'>
                    <div className="laptop:p-2">
                          <Link href={`/admin/userproducts/${order._id}`}>
                            <div type="button" className="edit-button">
                              Edit
                            </div>
                          </Link>
                      &nbsp;
                    </div>
                    <div className="laptop:p-2 ml-2">
                            <a>
                              <button
                                onClick={() => deleteHandler(order._id)}
                                className="red-button"
                              >
                                Delete
                              </button>
                            </a>
                    </div>
                </div>
          
            </div> 
                
            </div>
        </div>
              
            ))}

          </div>
        </div>
      )}
  </div>
  );
}

