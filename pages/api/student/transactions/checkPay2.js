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



        const { sen, or_id } = JSON.parse(req.body)

        const sender = await Student.findById(sen)
        const order = await CheckOutItem.findById(or_id)
        const Mass_Order = await CheckOutItem.find({ user: sen })
        const reciever = await Seller.find({ storename: order.storename })




        // collect delivery fee



        let fee = 0

        let store = []

        for (let i = 0; i < Mass_Order.length; i++) {
            store.push(Mass_Order[i].storename)

        }



        const n_store = [... new Set(store)]

        for (let i = 0; i < n_store.length; i++) {

            if (Mass_Order[i].mod === "PickUp") {
                fee = 0
            } else {
                fee = fee + 100
            }

        }


        //collect total 

        let sum = 0

        for (let i = 0; i < Mass_Order.length; i++) {
            sum += Mass_Order[i].amount
        }




        let total = sum + fee



        // console.log(or_id)



        if (order.p_status === "Pay on Delivery") {
            //checks if can afford amount and delivery fee before payment
            if (sender.account_bal < total) {
                return res.status(256).json({
                    message: "insufficient funds",
                });
            } else {

                const new_sender_bal = sender.account_bal - order.amount
                const sender_bal = await Student.findById(sen).updateOne({ account_bal: new_sender_bal })


                const sen_history = await TransferHistory.create({
                    sender: sender.firstname + sender.lastname,
                    reciever: reciever[0].storename,
                    amount: order.amount,
                    trans_type: "DEBIT",
                    send_id: sen,
                    rec_id: reciever[0]._id
                })



                let new_reciever_bal = order.amount + reciever[0].account_bal

                const reciever_bal = await Seller.findById(reciever[0]._id).updateOne({ account_bal: new_reciever_bal })


                const rec_history = await TransferHistory.create({
                    sender: sender.firstname + sender.lastname,
                    reciever: reciever[0].storename,
                    amount: order.amount,
                    trans_type: "CREDIT",
                    send_id: sen,
                    rec_id: reciever[0]._id
                })


                //converts status of item to paid 
                const paidItem = await CheckOutItem.findById(or_id).updateOne({ p_status: "Paid" })








                return res.status(200).json({
                    message: "successful"
                }
                )
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