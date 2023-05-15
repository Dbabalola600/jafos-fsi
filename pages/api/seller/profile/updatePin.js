import connectMongo from "../../../../utils/connectMongo";
import Seller from "../../../../model/Seller/Seller";




export default async function updatePassword(req, res) {
    if (req.method === "POST") {



        await connectMongo();

        const { id,  n_pin,  o_pin } = JSON.parse(req.body)


        const curr_pin = await Seller.findById(id)

        if (curr_pin.pin === o_pin) {
            const update = await Seller.findById(id).updateOne({ pin: n_pin })

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

