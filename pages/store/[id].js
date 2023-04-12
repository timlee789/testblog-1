import React, { useContext } from 'react';
import db from '../../utils/db';
import CustomItemScreen from '../../components/flyer/customitem';
import Layout from '../../components/flyer/layout';
import Product from '../../models/Product';
import User from '../../models/Users';
import HeadBanner from '../../components/flyer/headbanner';
import Cookies from 'js-cookie';
//import Store from '../../utils/Store';
//import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import {  useLoadScript } from '@react-google-maps/api';





function StoreScreen({ user, product}) {
   //const { state, dispatch } = useContext(Store);
   //const { cart } = state;
   //const { userStore} = cart;
//    dispatch({
//     type: 'SAVE_USER_STORE',
//     payload: user[0]._id
// });
  Cookies.set( 'Seller', user[0]._id)   
  Cookies.set( 'Sellername', user[0].name)   
  //Cookies.set( 'Seller', JSON.stringify(user[0]._id) )   

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
});

if(!isLoaded) return <div>Loading...</div>
  return (
    <Layout>
      <div className='mobile:bg-white laptop:bg-white'>
        {user.map((heads) => (
          <HeadBanner key={heads._id} banner={heads.banner} />
        ))}

        <div >
      
          <div>
            {/* <div>
              {store.map((hed) => (
                <Registration key={hed._id} id={hed._id} />
              ))}
            </div> */}
            <div>
              <div className=" mobile:grid grid-cols-2 p-2 gap-2 laptop:grid-cols-4 p-2 gap-2 ml-auto mr-auto">
                {product.map((sto) => (
                  <CustomItemScreen
                    key={sto._id}
                    _id={sto._id}
                    productname={sto.productname}
                    listprice={sto.listprice}
                    saleprice={sto.saleprice}
                    image={sto.image}
                    description1={sto.description1}
                    user={sto.user}
                    countInStock={sto.countInStock}
                  />
                ))}
              </div>
              {/* <HomePage /> */}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const { params } = context;
  const { id } = params;
  await db.connect();
  const user = await User.find({ _id: id });
  const product = await Product.find({ user: id });
  await db.disconnect();
  return {
    props: {
      product: JSON.parse(JSON.stringify(product)),
      user: JSON.parse(JSON.stringify(user)),
    },
  };
}
export default StoreScreen;

