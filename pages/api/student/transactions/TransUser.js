import connectMongo from "../../../../utils/connectMongo";
import Student from "../../../../model/Student/StudentModel";


export default async function TransUser(req, res) {
    if (req.method === "POST") {

        console.log('CONNECTING TO MONGO');
        await connectMongo();
        console.log('CONNECTED TO MONGO');


        const { sen, amt, rec, pin } = JSON.parse(req.body)



        const sender = await Student.findById(sen)
        const reciever = await Student.find({matricno: rec})

        // console.log(sender.account_bal)


        if (pin === sender.pin) {
            if (sender.account_bal > amt) {
                const new_sender_bal = sender.account_bal - amt
                const sender_bal = await Student.findById(sen).updateOne({ account_bal: new_sender_bal })

                const new_reciever_bal = reciever[0].account_bal + amt
                const reciever_bal = await Student.findById(reciever[0]._id).updateOne({ account_bal: new_reciever_bal })

                return res.status(200).json({
                  message:"successful"}
                )
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

