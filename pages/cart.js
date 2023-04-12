import React, { useContext } from 'react';
import { Store } from '../utils/Store';
import Image from 'next/image';
import Layout from '../components/flyer/layout';
import Link from 'next/link';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';

function CartScreen() {
  const router = useRouter();
  const { state, dispatch } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;
  const removeItemHandler = (item) => {
    dispatch({ type: 'CART_REMOVE_ITEM', payload: item });
  };
  const updateCartHandler = async (item, qty) => {
    const quantity = Number(qty);
    const { data } = await axios.get(`/api/cartproduct/${item._id}`);
    if (data.countInStock < quantity) {
      return toast.error('Sorry, Product is out of stock');
    }
    dispatch({ type: 'CART_ADD_ITEM', payload: { ...item, quantity } });
    toast.success('Product updated in the cart');
  };
  return (
    <Layout title="Shopping Cart">
      <h1 className="mb-4 text-xl">Shopping Cart</h1>
      {cartItems.length === 0 ? (
        <div>
          Cart is empty. <Link href="/">Go Shopping</Link>
        </div>
      ) : (
        <div className="grid md:grid-cols-4 md:gap-5">
          <div className="overflow-x-auto md:col-span-3 text-black'">
            <table className="min-w-full">
              <thead className="border-b">
                <tr>
                  <th className="px-2 text-left text-sm">Item</th>
                  <th className="px-2 text-left text-sm">Name</th>
                  <th className="p-2 text-right text-sm">Qty</th>
                  <th className="p-2 text-right text-sm">Price</th>
                  <th className="p-2 text-sm">Action</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item) => (
                  <tr key={item.slug} className="border-b">
                    <td>
                      <Link href={`/product/${item._id}`}>
                        <div className="flex items-center">
                          <Image
                            src={item.image}
                            alt={item.productname}
                            width={50}
                            height={60}
                          />
                        
                        </div>
                      </Link>
                    </td>
                    <td>
                      <Link href={`/product/${item._id}`}>
                        <div className="flex items-center text-xs">
                          &nbsp; {item.productname} 
                        </div>
                      </Link>
                    </td>
                    <td className="p-2 text-right">
                      <select
                        value={item.quantity}
                        onChange={(e) =>
                          updateCartHandler(item, e.target.value)
                        }
                      >
                        {[...Array(item.countInStock).keys()].map((x) => (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="p-2 text-right text-sm">{item.saleprice}</td>
                    <td className="p-2 text-center text-sm">
                      <button onClick={() => removeItemHandler(item)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="card p-5 mt-5 text-black">
            <ul>
              <li>
                <div className="pb-3 text-xl">
                  Subtotal ({cartItems.reduce((a, c) => a + c.quantity, 0)}) : $
                  {cartItems.reduce((a, c) => a + c.quantity * c.saleprice, 0)}
                </div>
              </li>
              <li>
                <button
                  className="primary-button w-full"
                  onClick={() => router.push('/shipping')}
                  // onClick={() => router.push('login?redirect=/shipping')}
                >
                  Check Out
                </button>
              </li>
            </ul>
          </div>
        </div>
      )}
    </Layout>
  );
}

export default dynamic(() => Promise.resolve(CartScreen), { ssr: false });