import mongoose, { Schema, model, models } from 'mongoose';








const OrderSchema = new Schema({

    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'Student',
        required: true,
        unique: false

    },

    orderList: {
        type: Array,
        ref: 'OrderItem',
        required: true,
        unique: false,
    }

},
    { timestamps: true }
);


const Order = models.Order || model("Order", OrderSchema)
export default Order