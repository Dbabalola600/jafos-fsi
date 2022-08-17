import { Schema, model, models } from 'mongoose';

const Product_Seller4Schema = new Schema ({    
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



const Product_Seller4 = models.Product_Seller4 || model('Product_Seller4', Product_Seller4Schema);

export default Product_Seller4;