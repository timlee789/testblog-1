import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  category: {type: String },
  productname: { type: String, required: true },
  listprice: { type: Number },
  saleprice: { type: Number },
  image: { type: String, required: true },
  // image2: { type: String },
  // image3: { type: String },
  // image4: { type: String },
  // image5: { type: String },
  // image6: { type: String },
  // image7: { type: String },
  // image8: { type: String },
  // image9: { type: String },
  // image10: { type: String },
  description1: { type: String, required: true },
  description2: { type: String, required: true },

   countInStock: { type: Number, required: true },
  // isFeatured: { type: Boolean, default: false },
  banner: String,
});

const Product =
  mongoose.models.Product || mongoose.model('Product', productSchema);
export default Product;
