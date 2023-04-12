import db from '../../../utils/db';
import { getSession } from 'next-auth/react';
import Category from '../../../models/Category';

const postHandler = async (req, res) => {
  const session = await getSession({ req });
  if (!session) {
    return res.status(401).send({ message: ' Signin Required' });
  }
  const { user } = session;
  if (req.method !== 'POST') {
    return;
  }
  const { category, description } = req.body;

  await db.connect();
  const newCategory = new Category({
    category,
    description,
    user: user._id,
  });
 const categories = await newCategory.save();

  await db.disconnect();
  res.status(200).send({ message: 'Category created successfully', categories });
};

export default postHandler;
