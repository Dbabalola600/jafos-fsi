import Student from "../../../../model/Student/StudentModel";
import connectMongo from "../../../../utils/connectMongo";





export default async function AddBank(req, res) {
    if (req.method === "POST") {

        console.log('CONNECTING TO MONGO');
        await connectMongo();
        console.log('CONNECTED TO MONGO');



        const { id, accountNo, firstname, lastname } = JSON.parse(req.body)

        const user = Student.findById(id)





        // const upper = await Student.findById(id).updateOne({
        //     bankDetails: {
        //         accountNo: accountNo,
        //         firstname: firstname,
        //         lastname: lastname
        //     }
        // })




        const upper = await Student.updateOne(
            { _id: id },
            { $push: { bankDetails: { $each: [{accountNo, firstname, lastname}], $position: 0 } } },
            { new: true }
        ).exec()


        return res.status(200).json(upper)
    } else {
        return res.status(400).json({
            message: "wrong request",
        });
    }
}
