import { Schema, model, models } from 'mongoose';


const TransferHistorySchema = new Schema({

    sender:{
        type:String,
        required: true,
        unique: false
    },
    reciever:{
        type:String,
        required: true,
        unique: false
    },
    amount:{
        type:Number,
        required: true,
        unique: false
    },
    trans_type:{
        type:String,
        required: true,
        unique: false
    },
    send_id:{
        type: String,
        required: true,
        unique: false
    },
    rec_id:{
        type: String,
        required: true,
        unique: false
    }

},
{ timestamps: true }
)



const TransferHistory = models.TransferHistory || model('TransferHistory',TransferHistorySchema);
export default TransferHistory;