import { Schema, model, models } from 'mongoose';

const SellerSchema = new Schema({
  
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
  role: {
    type: String,
    enum: ['student', 'seller'  ],
    default: 'seller'
  }
},
{timestamps: true}
);

const Seller = models.Seller || model('Seller', SellerSchema);

export default Seller;