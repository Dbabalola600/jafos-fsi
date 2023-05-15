import connectMongo from "../../../../utils/connectMongo";
import Seller from "../../../../model/Seller/Seller";




export default async function updatePassword(req, res) {
    if (req.method === "POST") {



        await connectMongo();

        const { id, n_pass, o_pass } = JSON.parse(req.body)


        const curr_pass = await Seller.findById(id)

        if (curr_pass.password === o_pass) {
            const update = await Seller.findById(id).updateOne({ password: n_pass })

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

