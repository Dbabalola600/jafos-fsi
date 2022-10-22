import connectMongo from "../../../utils/connectMongo";
import User from "../../../model/TEST Account/Users";




export default async function debitAccount(req, res) {
    if (req.method === "POST") {
        console.log('CONNECTING TO MONGO');
        await connectMongo();
        console.log('CONNECTED TO MONGO');


        const { _id, debit } = req.body

        const user = await User.findById(_id)


        if (user.account_bal > debit) {
            const new_bal = user.account_bal - debit

            const bal = await User.findById(_id).updateOne({ account_bal: new_bal })
            console.log(bal)
            return res.status(200).json(
                user.account_bal
            )
        } else {
            return res.status(256).json({
                message: " too heavy",
            });

        }



    } else {

        return res.status(400).json({
            notFound: true,
        });

    }
}







