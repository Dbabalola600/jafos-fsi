import connectMongo from "../../../../utils/connectMongo";
import Student from "../../../../model/Student/StudentModel";
import Seller from "../../../../model/Seller/Seller";
import CheckOutItem from "../../../../model/Student/CheckOutItem";
import TransferHistory from "../../../../model/Transactions/TransferHistory";





export default async function checkoutPayment(req, res) {
    if (req.method == "POST") {
        console.log('CONNECTING TO MONGO');
        await connectMongo();
        console.log('CONNECTED TO MONGO');


        const { sen, amt, mass_rec, pin, massCheck_id } = JSON.parse(req.body)

        const sender = await Student.findById(sen)





        //to get the orders in order
        const orders = await Promise.all((
            massCheck_id.map(async (check_id) => {
                return await CheckOutItem.findById(check_id)
            })
        ))









        // to get the stores for updating the account details
        const storeStruct = []

        for (let i = 0; i < orders.length; i++) {
            storeStruct.push(await Seller.find({ storename: orders[i].storename }))
        }



        //get an ordered list of store ids
        const store_id = []
        for (let i = 0; i < orders.length; i++) {
            store_id.push(await Seller.find({ storename: orders[i].storename }).select("_id"))
        }


        console.log(store_id[1])

        if (pin === sender.pin) {
            if (sender.account_bal > amt) {


                const new_store_bal = []


                let i = 0;
                //gets array ordered list of new account balances
                for (i = 0; i < storeStruct.length; i++) {
                    if (storeStruct[i][0].storename === orders[i].storename) {


                        new_store_bal.push(storeStruct[i][0].account_bal + JSON.parse(orders[i].amount))
                    }

                }









                for (let i = 0; i < storeStruct.length; i++) {
                    console.log(storeStruct[i][0].account_bal + JSON.parse( new_store_bal[i]))


                    // supposed to credit the sellers accounts

                    const sled = await Promise.all((
                        store_id.map(async (id) => {
                            return await Seller.findByIdAndUpdate(id, { account_bal: storeStruct[i][0].account_bal + JSON.parse(new_store_bal[i]) }, { new: true })
                        })
                    ))



                    //creates history of transactions
                    const rec_history = await TransferHistory.create({
                        sender: sender.firstname + sender.lastname,
                        reciever: storeStruct[i][0].storename,
                        amount: new_store_bal[i],
                        trans_type: "CREDIT",
                        send_id: sen,
                        rec_id: storeStruct[i][0]._id
                    })




                }




                return res.status(200).json({ message: "successful" })



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


