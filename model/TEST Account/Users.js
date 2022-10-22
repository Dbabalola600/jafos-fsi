import { Schema, model, models } from 'mongoose';





const UserSchema = new Schema({
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
    matricno: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    account_bal: {
        type: Number,
        default: 400.50
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
        enum: ['student', 'seller', 'Admin'],
        default: 'student'
    },
},
    { timestamps: true }
)



const User = models.User || model('User', UserSchema);
export default User; 