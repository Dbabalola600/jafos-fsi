import mongoose, { Schema, model, models } from 'mongoose';



const TokenSchema = new Schema({
    userId: {
        type: mongoose.Schema.ObjectId,
        required: true,
        ref: "Student",
    },
    token: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true,
        enum: ["reset_password", "verify_email", "refresh_token"]
    },
    expiresAt: {
        type: Date,
        required: true,
        default: Date.now,
        expires: 300000 // 5 minutes grace period
    }

})



const Token = models.Token || model('TokenSchema', TokenSchema);

export default Token;