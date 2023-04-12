import { getSession } from 'next-auth/react';
import Order from '../../../../models/Order';
import db from '../../../../utils/db';

const handler = async (req, res) => {
  const session = await getSession({ req });
  if (!session || (session && !session.user.isAdmin)) {
    return res.status(401).send('signin required');
  }
  const { user } = session;
  if (req.method === 'GET') {
    await db.connect();
    const userid = user._id
    const orders = await Order.find({seller: userid });
    //const orders = await Order.find({}).populate('user', user);
    await db.disconnect();
    res.send(orders);
  } else {
    return res.status(400).send({ message: 'Method not allowed' });
  }
};

export default handler;