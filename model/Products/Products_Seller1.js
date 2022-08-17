import { Schema, model, models } from 'mongoose';

const Product_Seller1Schema = new Schema ({    
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



const Product_Seller1 = models.Product_Seller1 || model('Product_Seller1', Product_Seller1Schema);

export default Product_Seller1;