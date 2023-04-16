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



        const { sen, devf } = JSON.parse(req.body)



        const sender = await Student.findById(sen)



        if (devf > 0) {
            const MainAdmin = await Admin.find({ AdminId: "Admin101" })

            const main_admin_bal = MainAdmin[0].account_bal + JSON.parse(devf)
            const new_main_admin_bal = await Admin.findById(MainAdmin[0]._id).updateOne({ account_bal: main_admin_bal })

            const dev_history = await TransferHistory.create({
                sender: sender.firstname + sender.lastname,
                reciever: MainAdmin[0].AdminId,
                amount: devf,
                trans_type: "DEBIT",
                send_id: sen,
                rec_id: MainAdmin[0]._id
            })


            // add delivery fee history for recipient
            return res.status(200).json({
                message: "successful"
            }
            )
        } else {
            return res.status(200).json({
                message: "successful no fee"
            }
            )
        }

    } else {
        return res.status(400).json({
            message: "wrong request",
        });

    }
}