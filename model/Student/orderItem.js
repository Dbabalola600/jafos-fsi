import mongoose, { Schema, model, models } from 'mongoose';


const OrderItemSchema = new Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'Student',
        required: true,
        unique: false

    },
    product: {
        type: String,
        required: true,
        unniqe: false
    },
    storename: {
        type: String,
        required: true,
        unique: false,
    },

    price: {
        type: Number,
        required: true,
        unique: false
    },

    quantity: {
        type: Number,
        required: true,
        unique: false
    },


    amount: {
        type: Number,
        required: true,
        unique: false
    },
    status:{
        type: String,
        enum: ['Pending', 'Completed', 'Delivered'],
        default: 'Pending'
    }

},
    { timestamps: true }
)


const OrderItem = models.OrderItem || model("OrderItem", OrderItemSchema)

export default OrderItem