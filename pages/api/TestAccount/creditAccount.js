import connectMongo from "../../../utils/connectMongo";
import User from "../../../model/TEST Account/Users";




export default async function creditAccount(req, res) {
    if (req.method === "POST") {
        console.log('CONNECTING TO MONGO');
        await connectMongo();
        console.log('CONNECTED TO MONGO');


        const { _id, credit } = req.body

        const user = await User.findById(_id)




        const new_bal = credit + user.account_bal

        const bal = await User.findById(_id).updateOne({account_bal: new_bal})
        console.log(bal)
        return res.status(200).json(
            user.account_bal
        )

    } else {

        return res.status(400).json({
            message: "wrong request",
        });

    }
}







