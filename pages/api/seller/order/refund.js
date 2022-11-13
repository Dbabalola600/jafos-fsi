import connectMongo from "../../../../utils/connectMongo";
import Student from "../../../../model/Student/StudentModel";
import Seller from "../../../../model/Seller/Seller";


export default async function Refund(req, res) {
    if (req.method === "POST") {
        console.log('CONNECTING TO MONGO');
        await connectMongo();
        console.log('CONNECTED TO MONGO');



        const { sen, amt, rec,stat } = JSON.parse(req.body)

        if(stat === "Paid"){
            const reciever = await Student.findById(rec)
            const sender = await Seller.find({ storename: sen })
    
            console.log(sender[0].account_bal)
    
            const new_sender_bal = sender[0].account_bal - amt
            const sender_bal = await Seller.findById(sender[0]._id).updateOne({ account_bal: new_sender_bal })
    
            const new_reciever_bal = reciever.account_bal + amt
            const reciever_bal = await Student.findById(reciever._id).updateOne({ account_bal: new_reciever_bal })
    
            return res.status(200).json({
                message: "successful"
            }
            )
        }else{ return res.status(200).json({
            message: "no refund"
        })

        }

       



    } else {
        return res.status(400).json({
            message: "wrong request",
        });

    }
} 