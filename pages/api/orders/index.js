import { getSession } from 'next-auth/react';
import Order from '../../../models/Order';
import db from '../../../utils/db';
import Cookie from 'js-cookie';

const handler = async (req, res) => {
  // const session = await getSession({ req });
  // if (!session) {
  //   return res.status(401).send('signin required');
  // }

  //const { user } = session;
  //const { seller } = Cookie.get('Seller');
  await db.connect();
  const newOrder = new Order({
    ...req.body,
    //user: seller,
  });

  const order = await newOrder.save();
  await db.disconnect();
  res.status(201).send(order);
};
export default handler;