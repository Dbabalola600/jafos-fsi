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



        const { sen } = JSON.parse(req.body)

        const sender = await Student.findById(sen)

        // get orders in order of stores
        const orders = await CheckOutItem.find({ user: sen }).sort({ storename: -1 })



        //get stores
        let store = []

        for (let i = 0; i < orders.length; i++) {
            store.push(orders[i].storename)

        }
        const n_store = [... new Set(store)]



        //get amounts for each store 
        let s_amt = []

        for (let i = 0; i < orders.length; i++) {
            s_amt.push({ store: orders[i].storename, amount: orders[i].amount })
        }

        //getting the stores and defaulting all amounts to zero
        let amount_per_store = []
        for (let i = 0; i < n_store.length; i++) {
            amount_per_store.push({ store: n_store[i], amount: 0 })
        }

        //updating the array so each amount mathches what the store is due 
        for (let j = 0; j < amount_per_store.length; j++) {
            for (let i = 0; i < s_amt.length; i++) {
                if (s_amt[i].store === amount_per_store[j].store) {
                    amount_per_store[j].amount = amount_per_store[j].amount + s_amt[i].amount
                }
            }
        }



        // getting total of amount due
        let total = 0
        //check if it's already paid for 
        for (let i = 0; i < orders.length; i++) {
            // get total based on items paid for or not
            if (orders[i].p_status === "Paid") {
                total = total
            } else {
                total += orders[i].amount
            }
        }
        // return res.json(total)

        //check if there is anything to pay
        if (total === 0) {
            return res.status(200).json("paid for all")
        } else {
            //check if user can afford it 
            if (sender.account_bal < total) {
                return res.status(256).json({ message: "insufficient funds" })


            } else {

                //subtract total from user
                const new_sender_bal = sender.account_bal - total
                //update mongo with the new user balance 
                const sender_bal = await Student.findById(sen).updateOne({ account_bal: new_sender_bal })


                //find each seller             
                const reciever = await Promise.all(n_store.map(async (store) => {
                    const o_store = Seller.findOne({ storename: store })
                    return (o_store)
                }))


                //converts status of item to paid
                for (let i = 0; i < orders.length; i++) {
                    const PaidItem = await CheckOutItem.findById(orders[i]._id).updateOne({ p_status: "Paid" })

                }


                //loop the sellers
                for (let i = 0; i < amount_per_store.length; i++) {
                    //adds from each seller
                    const main_sell_bal = reciever[i].account_bal + amount_per_store[i].amount

                    //updates database
                    const new_main_sell_bal = await Seller.findById(reciever[i]._id).updateOne({ account_bal: main_sell_bal })



                    //debit transfer history 
                    const dev_history = await TransferHistory.create({
                        sender: sender.firstname + sender.lastname,
                        reciever: reciever[i].storename,
                        amount: amount_per_store[i].amount,
                        trans_type: "DEBIT",
                        send_id: sen,
                        rec_id: reciever[i]._id
                    })

                    //credit transfer history
                    const dev_history2 = await TransferHistory.create({
                        sender: sender.firstname + sender.lastname,
                        reciever: reciever[i].storename,
                        amount: amount_per_store[i].amount,
                        trans_type: "CREDIT",
                        send_id: sen,
                        rec_id: reciever[i]._id
                    })

                }
                return res.status(200).json(reciever)



            }




        }






    } else {
        return res.status(400).json({
            message: "wrong request",
        });

    }
}