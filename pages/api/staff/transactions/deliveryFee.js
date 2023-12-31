import connectMongo from "../../../../utils/connectMongo";
import Staff from "../../../../model/Staff/StaffModel";
import TransferHistory from "../../../../model/Transactions/TransferHistory";
import Admin from "../../../../model/Admin/AdminModel";
import Seller from "../../../../model/Seller/Seller";
import CheckOutItem from "../../../../model/Student/CheckOutItem";



export default async function deliveryFee(req, res) {
    if (req.method === "POST") {


        console.log('CONNECTING TO MONGO');
        await connectMongo();
        console.log('CONNECTED TO MONGO');



        const { _id } = JSON.parse(req.body)

        const orders = await CheckOutItem.find({ user: _id })
        const stu = await Staff.findById(_id)
        console.log("FETCHED CHECKOUT")

        //get stores
        let store = []
        for (let i = 0; i < orders.length; i++) {
            store.push(orders[i].storename)

        }
        const n_store = [... new Set(store)]





        //determine delivery fee by the method of delivery and delivery fee status
        let fee = 0
        for (let i = 0; i < n_store.length; i++) {

            if (orders[i].mod != "PickUp" && orders[i].dev_fee_status === "Unpaid") {
                fee = fee + 100
            } else {
                fee = 0
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
                //subtract from the user
                const new_sender_bal = stu.account_bal - fee
                const new_user_bal = await Staff.findById(_id).updateOne({ account_bal: new_sender_bal })


                const l_store = await Promise.all(n_store.map(async (name) => {
                    const o_store = Seller.findOne({ storename: name })
                    return (o_store)
                }))

                //update each checkout item 
                for (let i = 0; i < orders.length; i++) {
                    const new_orders = await CheckOutItem.findById(orders[i]._id).updateOne({ dev_fee_status: "Paid" })
                }

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