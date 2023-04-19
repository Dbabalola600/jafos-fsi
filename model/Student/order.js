import mongoose, { Schema, model, models } from 'mongoose';








const OrderSchema = new Schema({

    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'Student',
        required: true,
        unique: false

    },
    orderNum: {
        type: Number,
        required: true,
        unique: false
    },

    stores: {
        type: Array,
        required: true,
        unique: false
    },

    devFee: {
        type: Number,
        required: true,
        default: 0
    },

    orderList: {
        type: Array,

        required: true,
        unique: false,
    }

},
    { timestamps: true }
);


const Order = models.Order || model("Order", OrderSchema)
export default Order