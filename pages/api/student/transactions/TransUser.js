import connectMongo from "../../../../utils/connectMongo";
import Student from "../../../../model/Student/StudentModel";
import TransferHistory from "../../../../model/Transactions/TransferHistory";





export default async function TransUser(req, res) {
    if (req.method === "POST") {

        console.log('CONNECTING TO MONGO');
        await connectMongo();
        console.log('CONNECTED TO MONGO');


        const { sen, amt, rec, pin } = JSON.parse(req.body)



        const sender = await Student.findById(sen)
        const reciever = await Student.find({ matricno: rec })

        // console.log(reciever[0]._id)




        if (reciever[0].matricno === undefined) {
            return res.status(240).json({ message: "not a user" })
        } else {
            if (sender.matricno === reciever[0].matricno) {
                return res.status(242).json({ message: "same user" })
            } else {
                if (pin === sender.pin) {
                    if (sender.account_bal > amt) {
                        const new_sender_bal = sender.account_bal - amt
                        const sender_bal = await Student.findById(sen).updateOne({ account_bal: new_sender_bal })

                        const sen_history = await TransferHistory.create({
                            sender: sender.firstname + sender.lastname,
                            reciever: reciever[0].firstname + reciever[0].lastname,
                            amount: amt,
                            trans_type: "DEBIT",
                            send_id: sen,
                            rec_id: reciever[0]._id
                        })


                        console.log(reciever[0])

                        let new_reciever_bal = JSON.parse(amt) + reciever[0].account_bal



                        console.log(new_reciever_bal)

                        const reciever_bal = await Student.findById(reciever[0]._id).updateOne({ account_bal: new_reciever_bal })

                        const rec_history = await TransferHistory.create({
                            sender: sender.firstname + sender.lastname,
                            reciever: reciever[0].firstname + reciever[0].lastname,
                            amount: amt,
                            trans_type: "CREDIT",
                            send_id: sen,
                            rec_id: reciever[0]._id
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
        }








    } else {
        return res.status(400).json({
            message: "wrong request",
        });

    }
}

