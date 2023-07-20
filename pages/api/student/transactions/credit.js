import connectMongo from "../../../../utils/connectMongo";
import Token from "../../../../model/Creder/Token";
import Student from "../../../../model/Student/StudentModel";
import AdminToken from "../../../../model/Admin/AdminToken"
import TransferHistory from "../../../../model/Transactions/TransferHistory";
import Creder from "../../../../model/Creder/Creder"



export default async function TokenCredit(req, res) {
    if (req.method === "POST") {
        console.log('CONNECTING TO MONGO');
        await connectMongo();
        console.log('CONNECTED TO MONGO');




        const { amount, id } = JSON.parse(req.body)

        const user = await Student.findById(id)






        //credit account with token 
        const new_bal = JSON.parse(amount) + user.account_bal
        console.log(new_bal)


         const bal = await Student.findById(id).updateOne({ account_bal: new_bal })




        const history = await TransferHistory.create({
            sender: user.firstname + user.lastname + "card ",
            reciever: user.firstname + user.lastname,
            amount: amount,
            trans_type: "TOKENCREDIT",
            send_id: "sender",
            rec_id: id
        })

        // console.log(new_rec_bal)




        return res.status(200).json({
            message: "transfer done",

        })












    } else {

        return res.status(400).json({
            message: "wrong request",
        });

    }
}
