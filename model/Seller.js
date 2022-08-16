import { Schema, model, models } from 'mongoose';

const SellerSchema = new Schema({
  
  firstname: {
    type: String,
    required: true,
    unique: true,
  },
  lastname: {
    type: String,
    required: true,
    unique: true,
  },
  storename: {
    type: Number,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    unique: false,
  },
});

const Seller = models.Seller || model('Seller', SellerSchema);

export default Seller;