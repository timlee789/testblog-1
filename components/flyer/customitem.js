import React, { useContext } from 'react';
import Image from 'next/image';
import { Store } from '../../utils/Store';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import Link from 'next/link';
//import Map from '@/components/map';
import {  useLoadScript} from '@react-google-maps/api';

export default function CustomItemScreen(props) {
  const { state, dispatch } = useContext(Store);
  const addToCartHandler = async () => {
    const existItem = state.cart.cartItems.find((x) => x._id === props._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(`/api/cartproduct/${props._id}`);
    if (data.countInStock < quantity) {
      return toast.error('Sorry, Product is out of stock');
    }
    dispatch({ type: 'CART_ADD_ITEM', payload: { ...props, quantity } });
  };

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
});

if(!isLoaded) return <div>Loading...</div>
  return (
    <div  > 
      <Link href={`/item/${props._id}`}>
      <div className="flex justify-center card">     
       
        <div className='mobile:h-64 laptop:h-128'>
          <Image
            src={props.image}
            alt="banner"
            width={300}
            height={350}
            className="mobile:element1 laptop:element2"
          />
          </div>
      </div>
      </Link>
    <div >
      <div className="bg-slate-100 mb-6 text-center h-44">
        <div className='flex justify-center  '>
        <div className="text-xs text-red-800 line-through"> U$: {props.listprice}</div> &nbsp;&nbsp;&nbsp;
        <div className="font-bold text-sm text-black">sale U$: {props.saleprice}</div>
        </div>
        <div>{props.description}</div>
        <div className="mobile:font-bold text-xs text-blue-800 mb-4 mt-2">{props.description1}</div>
        <div className='text-xs h-20 text-black'>{props.productname}</div> 
        <button className="primary-button w-full font-bold text-sm" onClick={addToCartHandler}>
          Add to Cart
        </button>   
      </div> 
      </div>
      
    </div>
  );
}
