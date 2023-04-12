import mongoose from 'mongoose';
import { getSession } from 'next-auth/react';
import Menu from '../../../../models/Category';
import db from '../../../../utils/db';

const handler = async (req, res) => {
  const session = await getSession({ req });
  if (!session) {
    return res.status(401).send('signin required');
  }

  const { user } = session;
  if (req.method === 'GET') {
    return getHandler(req, res, user);
  } else if (req.method === 'PUT') {
    return putHandler(req, res, user);
  } else if (req.method === 'DELETE') {
    return deleteHandler(req, res, user);
  } else {
    return res.status(400).send({ message: 'Method not allowed' });
  }
};
const getHandler = async (req, res) => {
  await db.connect();
  const category = await Menu.findById(req.query.id);
  await db.disconnect();
  res.send(category);
};
const putHandler = async (req, res) => {
  await db.connect();
  const menu = await Menu.findById(req.query.id);
  if (menu) {
    menu.category = req.body.category;
    menu.description = req.body.description;
    await product.save();
    await db.disconnect();
    res.send({ message: 'Menu updated successfully' });
  } else {
    await db.disconnect();
    res.status(404).send({ message: 'Menu not found' });
  }
};
const deleteHandler = async (req, res) => {
  await db.connect();
  const product = await Menu.deleteOne({ _id: req.query.id });
 

  await db.disconnect();
   if (product) {
  res.status(404).send({ message: 'Menu deleted successfully' });
   }
  return;
};

export default handler;
