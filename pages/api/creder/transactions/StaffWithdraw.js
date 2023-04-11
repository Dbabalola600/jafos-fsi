import connectMongo from "../../../../utils/connectMongo";
import Staff from "../../../../model/Staff/StaffModel";
import Creder from "../../../../model/Creder/Creder";
import TransferHistory from "../../../../model/Transactions/TransferHistory";






export default async function StaffWithdraw(req,res){
    if(req.method === "POST"){
        const { sen, amt, rec, pin } = JSON.parse(req.body)


        const sender = await Staff.find({staffid: sen})
        const reciever = await Creder.findById(rec)

     

        console.log(sender[0]._id)
        if (pin === sender[0].pin) {
            if (sender[0].account_bal > amt) {
                const new_sender_bal = sender[0].account_bal - amt
                const sender_bal = await Staff.findById(sender[0]._id).updateOne({ account_bal: new_sender_bal })

                const sen_history = await TransferHistory.create({
                    sender: sender[0].firstname + sender[0].lastname,
                    reciever: reciever.creder_no,
                    amount: amt,
                    trans_type: "DEBIT",
                    send_id: sender[0]._id,
                    rec_id: reciever._id
                })








                let new_reciever_bal =  reciever.account_bal - JSON.parse(amt) 





                console.log(new_reciever_bal)



                const reciever_bal = await Creder.findById(reciever._id).updateOne({ account_bal: new_reciever_bal })
                const rec_history = await TransferHistory.create({
                    sender: sender[0].firstname + sender[0].lastname,
                    reciever: reciever.creder_no,
                    amount: amt,
                    trans_type: "WITHDRAW",
                    send_id: sender[0]._id,
                    rec_id: reciever._id
                })
                return res.status(200).json({
                    message: "successful"
                }
                )
            } else {
                return res.status(256).json({
                    message: "insufficient funds",
                });

            }
        } else {
            return res.status(245).json({
                message: "incorrect pin"
            })
        }
    }else {
        return res.status(400).json({
            message: "wrong request",
        });

    }
}