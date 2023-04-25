import connectMongo from "../../../../utils/connectMongo";
import Student from "../../../../model/Student/StudentModel";


export default async function updatePin(req, res) {
    if (req.method === "POST") {
        console.log('CONNECTING TO MONGO');
        await connectMongo();
        console.log('CONNECTED TO MONGO');


        const { id, n_pin, o_pin } = JSON.parse(req.body)

        const curr_pin = await Student.findById(id)
        
        if (curr_pin.pin === o_pin) {
            const updatepin = await Student.findById(id).updateOne({ pin: n_pin })

            return res.status(200).json({ message: "PIN CHANGED SUCESSFULLY" })

        } else {
            return res.status(401).json({ message: "incorrect Pin" })
        }




    } else {
        return res.status(400).json({
            message: "wrong request",
        });
    }

}
