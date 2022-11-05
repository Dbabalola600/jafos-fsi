import { Schema, model, models } from 'mongoose';

const SellerSchema = new Schema({
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
  store_desc: {
    type: String,
    required: true,
    unique: false
  },
  account_bal: {
    type: Number,
    default: 0
  },
  pin: {
    type: String,
    default: "1234",
    length: 4
  },
  role: {
    type: String,
    enum: ['student', 'seller', 'Admin','creder','staff'],
    default: 'seller'
  },
  status: {
    type: String,
    enum: ["Open", "Closed"],
    default: "Closed"
  }
},
  { timestamps: true }
);

const Seller = models.Seller || model('Seller', SellerSchema);

export default Seller;