import { Schema, model, models } from 'mongoose';

const Product_Seller2Schema = new Schema ({    
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



const Product_Seller2 = models.Product_Seller2 || model('Product_Seller2', Product_Seller2Schema);

export default Product_Seller2;