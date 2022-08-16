import { Schema, model, models } from 'mongoose';

const ProductSchema = new Schema ({    
    title: {
        type: String,
        required: true,
        unique: false,
      },
      category: {
        type: String,
        required: true,
        unique: false,
      },
      price: {
        type: Number,
        required: true,
        unique: false,
      },
      description: {
        type: String,
        required: false
      },
});



const Product = models.Product || model('Product', ProductSchema);

export default Product;