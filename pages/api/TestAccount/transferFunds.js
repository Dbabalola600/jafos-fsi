import connectMongo from "../../../utils/connectMongo";
import User from "../../../model/TEST Account/Users";




export default async function transferFunds(req, res) {
    if (req.method === "POST") {


        console.log('CONNECTING TO MONGO');
        await connectMongo();
        console.log('CONNECTED TO MONGO');


        const { sen, amt, rec,pin } = req.body

        const sender = await User.findById(sen)
        const reciever = await User.findById(rec)

        if (pin === sender.pin){
            if (sender.account_bal > amt ) {
                const new_sender_bal = sender.account_bal - amt
                const sender_bal = await User.findById(sen).updateOne({ account_bal: new_sender_bal })
    
                const new_reciever_bal = reciever.account_bal + amt
                const reciever_bal = await User.findById(rec).updateOne({ account_bal: new_reciever_bal })
    
                return res.status(200).json(
                    sender_bal, reciever_bal
                )
            } else {
                return res.status(256).json({
                    message: "insufficient funds",
                });
    
            }
        }else{
            return res.status(245).json({
                message:"incorrect pin"
            })
        }

        



    } else {

        return res.status(400).json({
            notFound: true,
        });

    }
}




