import connectMongo from "../../../../utils/connectMongo";
import Token from "../../../../model/Creder/token";
import Creder from "../../../../model/Creder/Creder";



export default async function fetchAvailToken(req, res) {
    if (req.method === "POST") {
        console.log('CONNECTING TO MONGO');
        await connectMongo();
        console.log('CONNECTED TO MONGO');

        const { id } = JSON.parse(req.body)
        const user = await Creder.findById(id)




        const tok = await Token.find({ status: "available" }).find({ madeBy: user.creder_no })


        return res.status(200).json(tok)
    } else {

        return res.status(400).json({
            message: "wrong request",
        });

    }
}
