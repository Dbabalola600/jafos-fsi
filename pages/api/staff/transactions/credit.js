import connectMongo from "../../../../utils/connectMongo";
import Token from "../../../../model/Creder/token";
import TransferHistory from "../../../../model/Transactions/TransferHistory";
import Creder from "../../../../model/Creder/Creder"

import Staff from "../../../../model/Staff/StaffModel";







export default async function TokenCredit(req, res) {
    if (req.method === "POST") {
        console.log('CONNECTING TO MONGO');
        await connectMongo();
        console.log('CONNECTED TO MONGO');




        const { tok, id } = JSON.parse(req.body)

        const user = await Staff.findById(id)


        const tok_val = await Token.find({ token: tok })

        // console.log(tok_val)

        // if(tok_val=== "") return res.status(408).json({message:"nope"})

        if (tok_val[0].status === "available") {
            //credit account with token 
            const new_bal = tok_val[0].amount + user.account_bal
            const bal = await Staff.findById(id).updateOne({ account_bal: new_bal })

            //update token details 
            const tok_update = await Token.findById(tok_val[0]._id).updateOne({ status: "used", usedBy: user.staffid })

            // update creder info
            const cred = await Creder.find({ creder_no: tok_val[0].madeBy })
            const new_rec_bal = tok_val[0].amount + cred[0].account_bal





            
            const history = await TransferHistory.create({
                sender: tok_val[0].madeBy,
                reciever: user.firstname + user.lastname,
                amount: tok_val[0].amount,
                trans_type: "TOKEN CREDIT",
                send_id: tok_val[0]._id,
                rec_id: id
            })

            console.log(new_rec_bal)




            return res.status(200).json({
                message: "transfer done",
                tok_val
            })





        }


        if (tok_val[0].status === "Master") {
            //credit account with token 
            const new_bal = tok_val[0].amount + user.account_bal
            const bal = await Staff.findById(id).updateOne({ account_bal: new_bal })

            //update token details 
            const tok_update = await Token.findById(tok_val[0]._id).updateOne({ usedBy: user.staffid })


            const history = await TransferHistory.create({
                sender: tok_val[0].madeBy,
                reciever: user.firstname + user.lastname,
                amount: tok_val[0].amount,
                trans_type: "MASTER TOKEN CREDIT",
                send_id: tok_val[0]._id,
                rec_id: id
            })



            console.log(history)





            return res.status(200).json({
                message: "transfer done",
            })
        }
        else {
            return res.status(256).json({
                message: "nope",
            });
        }







    } else {

        return res.status(400).json({
            message: "wrong request",
        });

    }
}