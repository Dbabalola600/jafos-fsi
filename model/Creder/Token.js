import { Schema, model, models } from 'mongoose';





const TokenSchema = new Schema({
    token: {
        type: String,
        required: true,
        unique: true
    },
    amount: {
        type: Number,
        required: true,
        unique: false
    },
    status: {
        type: String,
        enum: ["used", "available", "Master"],
        default: "available"
    },
    user: {
        type: String,
        required: true
    },
    usedBy: {
        type: String,
        default: "N/A",
        required: true,
        unique: false
    },
    madeBy: {
        type: String,
        required: true,
        unique: false
    }
},
    { timestamps: true }
)



const Token = models.Token || model('Token', TokenSchema);
export default Token;