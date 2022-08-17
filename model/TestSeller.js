import { Schema, model, models } from 'mongoose';

const TestSellerSchema = new Schema({
  
  firstname: {
    type: String,
    required: true,
    unique: false,
  },
  lastname: {
    type: String,
    required: true,
    unique: false,
  },
  storename: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    unique: false,
  },

  products:{
    type: Schema.Types.ObjectId ,
    ref : 'TestProduct'
  }
});

const TestSeller = models.TestSeller || model('TestSeller', TestSellerSchema);

export default TestSeller;