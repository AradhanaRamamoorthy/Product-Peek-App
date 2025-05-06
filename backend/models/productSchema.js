import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const productSchema = new mongoose.Schema(
  {
    name: String,
    category: String,
    tenant: String,
    description: String,
    price: Number
  },
  { versionKey: false }
);

productSchema.plugin(mongoosePaginate);
productSchema.index({ category: 1, tenant: 1 }); //Indexing logic


productSchema.index({ name: 'text', description: 'text' }); //Bonus feature: text search functionality
const Product = mongoose.model('Product', productSchema);

export default Product;
