
import connectMongo from "../../../../utils/connectMongo";
import Student from "../../../../model/Student/StudentModel";
import Seller from "../../../../model/Seller/Seller";
import TransferHistory from "../../../../model/Transactions/TransferHistory";



export default async function RecStudent(req, res) {
    if (req.method === "POST") {
        console.log('CONNECTING TO MONGO');
        await connectMongo();
        console.log('CONNECTED TO MONGO');

        const { sen, amt, rec, pin } = JSON.parse(req.body)




        const sender = await Student.find({ matricno: sen })
        const reciever = await Seller.findById(rec)


        if (sender[0] === undefined) {
            return res.status(247).json({ message: "nope" })
        } else {
            if (pin === sender[0].pin) {
                if (sender[0].account_bal > amt) {
                    const new_sender_bal = sender[0].account_bal - amt
                    const sender_bal = await Student.findById(sender[0]._id).updateOne({ account_bal: new_sender_bal })

                    const sen_history = await TransferHistory.create({
                        sender: sender[0].firstname + sender[0].lastname,
                        reciever: reciever.storename,
                        amount: amt,
                        trans_type: "DEBIT",
                        send_id: sen,
                        rec_id: rec
                    })

                    console.log(reciever.account_bal)

                    let new_reciever_bal = JSON.parse(amt) + reciever.account_bal

                    console.log(new_reciever_bal)

                    const reciever_bal = await Seller.findById(reciever._id).updateOne({ account_bal: new_reciever_bal })

                    const rec_history = await TransferHistory.create({
                        sender: sender[0].firstname + sender[0].lastname,
                        reciever: reciever.storename,
                        amount: amt,
                        trans_type: "CREDIT",
                        send_id: sen,
                        rec_id: rec
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
        }



    } else {
        return res.status(400).json({
            message: "wrong request",
        });

    }
}


