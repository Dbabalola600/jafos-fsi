import connectMongo from "../../../../utils/connectMongo";
import Student from "../../../../model/Student/StudentModel";
import Seller from "../../../../model/Seller/Seller";
import CheckOutItem from "../../../../model/Student/CheckOutItem";
import TransferHistory from "../../../../model/Transactions/TransferHistory"
import Admin from "../../../../model/Admin/AdminModel";


export default async function checkPay(req, res) {
    if (req.method === "POST") {
        console.log('CONNECTING TO MONGO');
        await connectMongo();
        console.log('CONNECTED TO MONGO');



        const { sen, amt, or_id, devf } = JSON.parse(req.body)

        const sender = await Student.findById(sen)
        const order = await CheckOutItem.findById(or_id)


       

        // console.log(or_id)
        const reciever = await Seller.find({ storename: order.storename })


        if (order.p_status === "Pay on Delivery") {
       
            if (sender.account_bal > (amt+ devf)) {
                const new_sender_bal = sender.account_bal - amt
                const sender_bal = await Student.findById(sen).updateOne({ account_bal: new_sender_bal })


                const sen_history = await TransferHistory.create({
                    sender: sender.firstname + sender.lastname,
                    reciever: reciever[0].storename,
                    amount: amt,
                    trans_type: "DEBIT",
                    send_id: sen,
                    rec_id: reciever[0]._id
                })



                let new_reciever_bal = JSON.parse(amt) +reciever[0].account_bal

                const reciever_bal = await Seller.findById(reciever[0]._id).updateOne({ account_bal: new_reciever_bal })


                const rec_history = await TransferHistory.create({
                    sender: sender.firstname + sender.lastname,
                    reciever: reciever[0].storename,
                    amount: amt,
                    trans_type: "CREDIT",
                    send_id: sen,
                    rec_id: reciever[0]._id
                })

                const paidItem = await CheckOutItem.findById(or_id).updateOne({ p_status: "Paid" })




               

               

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
            return res.status(259).json({
                message: "Already paid",
            });

        }





    } else {
        return res.status(400).json({
            message: "wrong request",
        });

    }
}