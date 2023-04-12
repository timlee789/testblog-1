import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  category: { type: String, required: true },
  description: { type: String, required: true },
 
});

const Category =
  mongoose.models.Category || mongoose.model('Category', categorySchema);
export default Category;
