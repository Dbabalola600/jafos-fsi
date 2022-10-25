import connectMongo from "../../../../utils/connectMongo";
import Student from "../../../../model/Student/StudentModel";
import Seller from "../../../../model/Seller/Seller";
import OrderItem from "../../../../model/Student/orderItem";


export default async function payOrder(req, res) {
    if (req.method === "POST") {
        console.log('CONNECTING TO MONGO');
        await connectMongo();
        console.log('CONNECTED TO MONGO');



        const { sen, amt, rec, pin, or_id } = JSON.parse(req.body)

        const sender = await Student.findById(sen)
        const reciever = await Seller.findById(rec)
        const order = await OrderItem.findById(or_id)




        if (pin === sender.pin) {
            if (sender.account_bal > amt) {
                const new_sender_bal = sender.account_bal - amt
                const sender_bal = await Student.findById(sen).updateOne({ account_bal: new_sender_bal })

                const new_reciever_bal = reciever.account_bal + amt
                const reciever_bal = await Seller.findById(reciever._id).updateOne({ account_bal: new_reciever_bal })
                
                
                const paidItem = await OrderItem.findById(or_id).updateOne({ p_status: "Paid" })

       
                return res.status(200).json({
                  message:"successful"}
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



    } else {
        return res.status(400).json({
            message: "wrong request",
        });

    }
}