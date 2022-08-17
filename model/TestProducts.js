import { Schema, model, models } from 'mongoose';

const TestProductSchema = new Schema ({    
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

      seller: {
        type :Schema.Type.ObjectId,
        ref: 'TestSeller'
      }
});



const TestProduct = models.TestProduct || model('TestProduct', TestProductSchema);

export default TestProduct;