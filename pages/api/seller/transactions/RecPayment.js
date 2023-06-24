import connectMongo from "../../../../utils/connectMongo";
import Student from "../../../../model/Student/StudentModel";
import Staff from "../../../../model/Staff/StaffModel"
import TransferHistory from "../../../../model/Transactions/TransferHistory";
import Seller from "../../../../model/Seller/Seller"





export default async function RecPayment(req, res) {
    if (req.method === "POST") {

        await connectMongo();


        const {sen, amt, rec, pin} = JSON.parse(req.body)


        const reciever = await Seller.findById(rec)

        const sender = await Student.find({matricno: sen})

         //check if student exists 
         if (sender[0] === undefined) {
            //check if staff exists
            const sender = await Staff.find({ staffid: sen })
            //if staff empty user not found
            if (sender[0] === undefined) {
                return res.status(256).json({
                    messgae: "user not found"
                })
            } else {
                //if staff is fpund
                //check for staff pin 
                if (pin === sender[0].pin) {

                    //check balance 
                    if (sender[0].account_bal > amt) {
                        //subtrract staff amount 
                        const new_sender_bal = sender[0].account_bal - amt
                        //update databse 
                        const sender_bal = await Staff.findById(sender[0]._id).updateOne({ account_bal: new_sender_bal })



                        //debit transaction history 
                        const sen_History = await TransferHistory.create({
                            sender: sender[0].firstname + sender[0].lastname,
                            reciever: reciever.storename,
                            amount: amt,
                            trans_type: "DEBIT",
                            send_id: sender[0]._id,
                            rec_id: reciever._id
                        })


                        //subtract amount from creder
                        const new_reciever_bal = reciever.account_bal + JSON.parse(amt)
                        //update database 
                        const reciever_bal = await Seller.findById(rec).updateOne({ account_bal: new_reciever_bal })

                        //withdraw transaction history
                        const rec_history = await TransferHistory.create({
                            sender: sender[0].firstname + sender[0].lastname,
                            reciever: reciever.storename,
                            amount: amt,
                            trans_type: "CREDIT",
                            send_id: sender[0]._id,
                            rec_id: reciever._id
                        })

                        return res.status(200).json({
                            message: "successful"
                        })
                    } else {
                        return res.status(230).json({
                            message: "insufficient funds"
                        })
                    }

                } else {
                    return res.status(245).json({
                        message: "invalid pin"
                    })
                }

            }


        } else {
            //if student is found
            //check for student pin
            if (pin === sender[0].pin) {
                //check balance 
                if (sender[0].account_bal > amt) {
                    //subtract student amount 
                    const new_sender_bal = sender[0].account_bal - amt
                    //update database 
                    const sender_bal = await Student.findById(sender[0]._id).updateOne({ account_bal: new_sender_bal })


                    //debit transaction history 
                    const sen_History = await TransferHistory.create({
                        sender: sender[0].firstname + sender[0].lastname,
                        reciever: reciever.storename,
                        amount: amt,
                        trans_type: "DEBIT",
                        send_id: sender[0]._id,
                        rec_id: reciever._id
                    })

                    //subtract amount from creder
                    const new_reciever_bal = reciever.account_bal + JSON.parse(amt)
                    //update database 
                    const reciever_bal = await Seller.findById(rec).updateOne({ account_bal: new_reciever_bal })


                    //withdraw transaction history

                    const rec_history = await TransferHistory.create({
                        sender: sender[0].firstname + sender[0].lastname,
                        reciever: reciever.storename,
                        amount: amt,
                        trans_type: "CREDIT",
                        send_id: sender[0]._id,
                        rec_id: reciever._id
                    })

                    return res.status(200).json({
                        message: "successful"
                    })
                } else {
                    return res.status(230).json({
                        message: "insufficient funds"
                    })
                }

            } else {
                return res.status(245).json({
                    message: "invalid pin"
                })
            }

        }



    } else {
        return res.status(400).json({
            message: "wrong request",
        });
    }
}