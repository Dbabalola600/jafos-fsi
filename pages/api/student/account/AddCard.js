import Student from "../../../../model/Student/StudentModel";
import connectMongo from "../../../../utils/connectMongo";


export default async function AddCard(req, res) {

    if (req.method === "POST") {

        console.log('CONNECTING TO MONGO');
        await connectMongo();
        console.log('CONNECTED TO MONGO');





        const { id, CardNo, CVV, ExpiryDate, pin } = JSON.parse(req.body)

        const user = Student.findById(id)



        const upper = await Student.updateOne(
            { _id: id },
            { $push: { cardDetails: { $each: [{ CardNo, CVV, ExpiryDate, pin }], $position: 0 } } },
            { new: true }
        ).exec()
        return res.status(200).json(upper)
    } else {
        return res.status(400).json({
            message: "wrong request",
        });
    }


}