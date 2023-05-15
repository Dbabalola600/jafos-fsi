


import connectMongo from "../../../../utils/connectMongo"
import Creder from "../../../../model/Creder/Creder"



export default async function updatePassword(req, res) {
    if (req.method === "POST") {
        console.log("CONNECTING TO MONGO")
        await connectMongo();
        console.log("CONNECTED")

        const { id, n_pin, o_pin } = JSON.parse(req.body)

        const curr_pin = await Creder.findById(id)

        console.log(curr_pin.pin)
        console.log(o_pin)
        if (curr_pin.pin === o_pin) {
            const update = await Creder.findById(id).updateOne({ pin: n_pin })

            return res.status(200).json({ message: "PASSWORD CHANGED " })
        } else {
            return res.status(401).json({ message: "incorrect password" })
        }




    } else {
        return res.status(400).json({
            message: "wrong request"
        })
    }
}