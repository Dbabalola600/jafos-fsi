import { Schema, model, models } from 'mongoose';



const CrederSchema = new Schema({
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
    creder_no: {
        type: String,
        required: true,
        unique: true,
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
    password: {
        type: String,
        required: true,
        unique: false,
    },
    role: {
        type: String,
        enum: ['student', 'seller', 'Admin','creder','staff'],
        default: 'creder'
    },
},
    { timestamps: true }
)



const Creder = models.Creder || model('Creder', CrederSchema);
export default Creder; 