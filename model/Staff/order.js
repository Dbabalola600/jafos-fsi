import mongoose, { Schema, model, models } from 'mongoose';








const OrderSchema = new Schema({

    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'Staff',
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

    orderList: {
        type:  Array,
       
        required: true,
        unique: false,
    }

},
    { timestamps: true }
);


const Order = models.Order || model("Order", OrderSchema)
export default Order