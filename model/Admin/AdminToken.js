import { Schema, model, models } from 'mongoose';





const AdminTokenSchema = new Schema({
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
        enum:["used", "available","MASTER"],
        default: "MASTER"
    },
    usedBy:{
        type:String,
        default:"N/A",
        required: true,
        unique: false
    },
    madeBy:{
        type:String,
        required: true,
        unique: false
    }
},
{ timestamps: true }
)



const AdminToken = models.AdminToken || model('AdminToken', AdminTokenSchema);
export default AdminToken;