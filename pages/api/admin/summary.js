import { getSession } from 'next-auth/react';
import Order from '../../../models/Order';
import Product from '../../../models/Product';
import User from '../../../models/Users';
import db from '../../../utils/db';

const handler = async (req, res) => {
  const session = await getSession({ req });
  //console.log(session);
  if (!session || (session && !session.user.isAdmin)) {
    return res.status(401).send('signin required');
  }
  const { user } = session;
  await db.connect();
  const userid = user._id;
  //const ordersCount = await Order.countDocuments();
  const productsCount = await Product.countDocuments();
  const usersCount = await User.countDocuments();

  const ordersPriceGroup = await Order.aggregate([
    {
      $match: { _id: userid}
    },
    {
      $group: {
        _id: null,
        sales: { $sum: '$totalPrice' },
      },
    },
  ]);
  const ordersPrice =
    ordersPriceGroup.length > 0 ? ordersPriceGroup[0].sales : 0;

  const ordersCountGroup = await Order.aggregate([
    {
      $match: {_id: userid}
    },
    {
      $count: '5'
    }
    
  ])
  const ordersCount = 
  ordersCountGroup.length > 0 ? ordersCountGroup[0].countDocuments : 5;

  const salesData = await Order.aggregate([
    {
      $match: { _id: userid}
    },
    {
      $group: {
        _id: { $dateToString: { format: '%Y-%m', date: '$createdAt' } },
        totalSales: { $sum: '$totalPrice' },
      },
    },
  ]);

  await db.disconnect();
  res.send({ ordersCount, productsCount, usersCount, ordersPrice, salesData });
};

export default handler;