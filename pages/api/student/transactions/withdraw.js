import connectMongo from "../../../../utils/connectMongo";
import Student from "../../../../model/Student/StudentModel";
import Creder from "../../../../model/Creder/Creder";
import TransferHistory from "../../../../model/Transactions/TransferHistory";


export default async function Withdraw(req, res) {
    if (req.method === "POST") {
        console.log('CONNECTING TO MONGO');
        await connectMongo();
        console.log('CONNECTED TO MONGO');


        const { sen, amt, rec, pin } = JSON.parse(req.body)


        const sender = await Student.findById(sen)
        // const reciever = await Creder.find({ creder_no: rec })

   

        // if (reciever[0].creder_no === undefined) {
        //     return res.status(240).json({ message: "not a creder" })
        // } else {
            if (pin === sender.pin) {
                if (sender.account_bal > amt) {
                    const new_sender_bal = sender.account_bal - amt
                    const sender_bal = await Student.findById(sen).updateOne({ account_bal: new_sender_bal })

                    const sen_history = await TransferHistory.create({
                        sender: sender.firstname + sender.lastname,
                        reciever: sender.firstname + sender.lastname +"bank account",
                        amount: amt,
                        trans_type: "DEBIT",
                        send_id: sen,
                        rec_id: sen
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

        // }



    } else {
        return res.status(400).json({
            message: "wrong request",
        });

    }
}
