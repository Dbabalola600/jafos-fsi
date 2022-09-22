import mongoose, { Schema, model, models } from 'mongoose';





const CartSchema = new Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'Student',
    required: true,
    unique: false

  },

  storename: {
    type: String,
    required: true,
    unique: false,
  },
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

},
  { timestamps: true }
);

const Cart = models.Cart || model('Cart', CartSchema);
export default Cart