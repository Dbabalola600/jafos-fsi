import mongoose, { Schema, model, models } from 'mongoose';

const TestOrderSchema = new Schema ({    
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
     

      user: {
        type : mongoose.Schema.ObjectId,
        ref: 'test',
        required: true,
        
      }
});



const TestOrder = models.TestProduct || model('TestOrder', TestOrderSchema);

export default TestOrder;