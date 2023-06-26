import connectMongo from "../../../../utils/connectMongo";
import Creder from "../../../../model/Creder/Creder"


export default async function YeetCreder(req, res) {
    if (req.method === "POST") {
        await connectMongo()

        const { user } = JSON.parse(req.body)
        const delOne = await Creder.findById(user).deleteOne({ _id: user })

        return res.status(200).json(delOne)

    } else {
        return res.status(400).json({
            notFound: true
        })
    }
}