import React, { useContext } from 'react';
import db from '../../utils/db';
import Image from 'next/image';
import Layout from '../../components/flyer/layout';
import Product from '../../models/Product';
import axios from 'axios';
import {Store} from '../../utils/Store';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import Link from 'next/link';
import { toast } from 'react-toastify';
import Map from '../../components/flyer/map';




function StoreScreen({ product}) {

  const { state, dispatch } = useContext(Store);
  const addToCartHandler = async () => {
    const existItem = state.cart.cartItems.find((x) => x._id === product._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(`/api/cartproduct/${product._id}`);
    if (data.countInStock < quantity) {
      return toast.error('Sorry, Product is out of stock');
    }
    dispatch({ type: 'CART_ADD_ITEM', payload: { ...product, quantity } });
  };

 console.log(product)
  return (
    <Layout>
       <div className="py-2 pl-5 font-bold">
        <Link href={`/store/${product.user}`}>back to products</Link>
      </div>
      <div  className="mobile:grid grid-cols-1 p-2 gap-2 laptop:grid-cols-3 p-2 gap-2 ml-auto mr-auto">  
        <div className="md:col-span-2">
        <div className="flex justify-center card">     
         <Carousel showArrows={true} showThumbs={false} swipeable={true} autoPlay >
        <div className='mobile:h-64 laptop:h-128'>
          <Image
            src={product.image}
            alt="banner"
            width={300}
            height={350}
            className="mobile:element1 laptop:element2"
          />
          </div>
        <div>
          <Image
            src={product.image}
            alt="banner"
            width={300}
            height={350}
            className="mobile:element1 laptop:element2"
          />
          </div>
        <div>
          <Image
            src={product.image}
            alt="banner"
            width={300}
            height={350}
            className="mobile:element1 laptop:element2"
          />
          </div>
        <div>
          <Image
            src={product.image}
            alt="banner"
            width={300}
            height={350}
            className="mobile:element1 laptop:element2"
          />
          </div>
          
        </Carousel>
      </div>
        </div>
        <div className='pl-4 text-black'>
          <ul>
            <li>
              <h1 className="text-sm font-bold text-blue-500 mb-4">{product.productname}</h1>
            </li>
            <div className='text-sm'>
            <li>List Price: ${product.listprice}</li>
            <li>Sale Price: ${product.saleprice}</li>
            {/* <li>Seller: {product.user}</li> */}
            <li>
              Inventory: {product.countInStock}
            </li>
            <li>Description: {product.description1}</li>
            </div>
          </ul>
        </div>
        <div>
          <div className="card p-5 text-black text-sm font-bold">
            <div className="mb-2 flex justify-between">
              <div>Price</div>
              <div>${product.saleprice}</div>
            </div>
            <div className="mb-2 flex justify-between">
              <div>Status</div>
              <div>{product.countInStock > 0 ? 'In stock' : 'Unavailable'}</div>
            </div>
            <button
              className="primary-button w-full"
              onClick={addToCartHandler}
            >
              Add to cart
            </button>
          </div>
          <div className='mb-2 font-bold'>Store Location</div>
        <Map />
        </div>
        
      </div>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const { params } = context;
  const { id } = params;
  await db.connect();
  //const user = await User.find({ _id: id });
  const product = await Product.findOne({ '_id': id });
  await db.disconnect();
  return {
    props: {
      
      //product: product ? db.convertDocToObj(product) : null,
      product: JSON.parse(JSON.stringify(product)),
      //user: JSON.parse(JSON.stringify(user)),
    },
  };
}
export default StoreScreen;

