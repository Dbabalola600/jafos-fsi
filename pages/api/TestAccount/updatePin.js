import connectMongo from "../../../utils/connectMongo";
import User from "../../../model/TEST Account/Users";








export default async function UpdatePin(req, res) {
    if (req.method === "POST") {
        console.log('CONNECTING TO MONGO');
        await connectMongo();
        console.log('CONNECTED TO MONGO');

        const { id, npin } = req.body

        const new_pin = await User.findById(id).updateOne({ pin: npin })

        return res.status(200).json(
            new_pin
        )

    } else {

        return res.status(400).json({
            notFound: true,
        });

    }
}