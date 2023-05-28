import mongoose, { Schema, model, models } from 'mongoose';


const CheckOutItemSchema = new Schema({
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
    status: {
        type: String,
        enum: ['Pending', 'Completed', 'Delivered', 'Cancelled'],
        default: 'Pending'
    },
    p_status: {
        type: String,
        required: true,
        enum: ["Paid", "Unpaid", "Pay on Delivery"],
        default: "Pay on Delivery"
    },
    dev_fee_status: {
        type: String,
        required: true,
        default: "Unpaid",
        enum: ["Paid", "Unpaid"]
    },
    mod: {
        type: String,
        required: true,
        // enum:["PickUp", "NDH","D1", "NEH","ADMIN", "E1", "E2" ],
        default: "PickUp"
    }

},
    { timestamps: true }
)


const CheckOutItem = models.CheckOutItem || model("CheckOutItem", CheckOutItemSchema)

export default CheckOutItem