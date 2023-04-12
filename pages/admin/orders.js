import axios from 'axios';
import Link from 'next/link';
import React, { useEffect, useReducer } from 'react';
import Layout from '../../components/flyer/layout';
import getError from '../../utils/error';

function reducer(state, action) {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true, error: '' };
    case 'FETCH_SUCCESS':
      return { ...state, loading: false, orders: action.payload, error: '' };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      state;
  }
}

export default function AdminOrderScreen() {
  const [{ loading, error, orders }, dispatch] = useReducer(reducer, {
    loading: true,
    orders: [],
    error: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch({ type: 'FETCH_REQUEST' });
        const { data } = await axios.get(`/api/admin/orders`);
        dispatch({ type: 'FETCH_SUCCESS', payload: data });
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: getError(err) });
      }
    };
    fetchData();
  }, []);

  return (
    <Layout title="Admin Dashboard">
      <div className="grid md:grid-cols-4 md:gap-5 bg-white">
        {/* <div>
          <ul>
            <li>
              <Link href="/admin/dashboard">Dashboard</Link>
            </li>
            <li>
              <Link href="/admin/orders">
                <div className="font-bold">Orders</div>
              </Link>
            </li>
            <li>
              <Link href="/admin/products">Products</Link>
            </li>
            <li>
              <Link href="/admin/users">Users</Link>
            </li>
          </ul>
        </div> */}
        <div className="overflow-x-auto md:col-span-3">
          <h1 className="mb-4 text-xl">Admin Orders</h1>

          {loading ? (
            <div>Loading...</div>
          ) : error ? (
            <div className="alert-error">{error}</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead className="border-b">
                  <tr>
                    <th className="px-3 text-left text-sm text-black">ID</th>
                    <th className="p-2 text-left text-sm text-black">USER</th>
                    <th className="p-2 text-left text-sm text-black">DATE</th>
                    <th className="p-2 text-left text-sm text-black">TOTAL</th>
                    {/* <th className="p-2 text-left">PAID</th>
                    <th className="p-2 text-left">DELIVERED</th> */}
                    <th className="p-2 text-left text-sm text-black">VIEW</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order._id} className="border-b">
                      <td className="p-2 text-sm text-black">{order._id.substring(20, 24)}</td>
                      <td className="p-2 text-sm text-black">
                        {order.shippingAddress.name }
                      </td>
                      <td className="p-2 text-sm text-black">
                        {order.createdAt.substring(0, 10)}
                      </td>
                      <td className="p-2 text-sm text-black">${order.totalPrice}</td>
                      {/* <td className="p-2">
                        {order.isPaid
                          ? `${order.paidAt.substring(0, 10)}`
                          : 'not paid'}
                      </td>
                      <td className="p-2">
                        {order.isDelivered
                          ? `${order.deliveredAt.substring(0, 10)}`
                          : 'not delivered'}
                      </td> */}
                      <td className="p-2 text-sm text-black">
                        <Link href={`/orders/${order._id}`} passHref>
                          <div>Details</div>
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}

AdminOrderScreen.auth = { adminOnly: true };