import { getSession } from 'next-auth/react';
import Category from '../../../models/Category';
import db from '../../../utils/db';
import Cookie from 'js-cookie';

const handler = async (req, res) => {
  const seller = Cookie.get('Seller');
  //const session = await getSession({ req });
  // if (!session) {
  //   return res.status(401).send({ message: 'signin required' });
  // }
 // const { user } = session;
  await db.connect();
 console.log(seller)
  //const userid = user._id;
  const menu = await Category.find().lean();
  await db.disconnect();
  res.send(menu);
  //return  res.status(201).send({message: user.name});
};
export default handler;
