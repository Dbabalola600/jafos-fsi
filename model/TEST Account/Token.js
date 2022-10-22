import { Schema, model, models } from 'mongoose';





const TokenSchema = new Schema({
    token:{
        type: String,
        required: true,
        unique: true
    },
    amount:{
        type: Number,
        required: true,
        unique: false
    },
    status:{
        type: String,
        enum:["used", "available"],
        default: "available"
    },
    usedBy:{
        type:String,
        default:"N/A",
        required: true,
        unique: false
    }
},
{ timestamps: true }
)



const Token = models.Token || model('Token', TokenSchema);
export default Token;