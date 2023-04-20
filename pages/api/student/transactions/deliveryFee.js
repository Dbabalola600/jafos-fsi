import connectMongo from "../../../../utils/connectMongo";
import Student from "../../../../model/Student/StudentModel";
import Seller from "../../../../model/Seller/Seller";
import CheckOutItem from "../../../../model/Student/CheckOutItem";
import TransferHistory from "../../../../model/Transactions/TransferHistory"
import Admin from "../../../../model/Admin/AdminModel";




export default async function deliveryFee(req, res) {
    if (req.method === "POST") {


        console.log('CONNECTING TO MONGO');
        await connectMongo();
        console.log('CONNECTED TO MONGO');



        const { _id } = JSON.parse(req.body)

        const orders = await CheckOutItem.find({ user: _id })
        const stu = await Student.findById(_id)
        console.log("FETCHED CHECKOUT")


        let store = []

        for (let i = 0; i < orders.length; i++) {
            store.push(orders[i].storename)

        }



        const n_store = [... new Set(store)]


        let fee = 0



        for (let i = 0; i < n_store.length; i++) {

            if (orders[i].mod === "PickUp") {
                fee = 0
            } else {
                fee = fee + 100
            }

        }

        const o_fee = fee / n_store.length


        let sum = 0
        for (let i = 0; i < orders.length; i++) {
            sum += orders[i].amount
        }
        let total = sum + fee

        if (fee > 0) {


            if (stu.account_bal < total) {
                return res.status(256).json({
                    message: "insufficient funds"
                })
            } else {
                const new_sender_bal = stu.account_bal - fee
                const new_user_bal = await Student.findById(_id).updateOne({ account_bal: new_sender_bal })


                const l_store = await Promise.all(n_store.map(async (name) => {
                    const o_store = Seller.findOne({ storename: name })
                    return (o_store)
                }))

                for (let i = 0; i < l_store.length; i++) {
                    const main_sell_bal = l_store[i].account_bal + o_fee

                    const new_main_sell_bal = await Seller.findById(l_store[i]._id).updateOne({ account_bal: main_sell_bal })

                    const dev_history = await TransferHistory.create({
                        sender: stu.firstname + stu.lastname,
                        reciever: l_store[i].storename,
                        amount: o_fee,
                        trans_type: "DEBIT",
                        send_id: _id,
                        rec_id: l_store[i]._id
                    })


                    const dev_history2 = await TransferHistory.create({
                        sender: stu.firstname + stu.lastname,
                        reciever: l_store[i].storename,
                        amount: o_fee,
                        trans_type: "CREDIT",
                        send_id: _id,
                        rec_id: l_store[i]._id
                    })
                }

                return res.status(200).json(l_store)
            }



            // return res.status(200).json(l_store)






        } else {
            return res.status(200).json({
                message: "no delivery fee but successful"
            })
        }




    } else {
        return res.status(400).json({
            message: "wrong request",
        });

    }
}