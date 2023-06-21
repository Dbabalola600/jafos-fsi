import connectMongo from "../../../../utils/connectMongo";
import Seller from "../../../../model/Seller/Seller";



export default async function YeetStore(req, res) {
    if (req.method === "POST") {
        await connectMongo()

        const { user } = JSON.parse(req.body)

        const delOne = await Seller.deleteOne({ _id: user })

        return res.status(200).json(delOne)

    } else {
        return res.status(400).json({
            notFound: true
        })
    }
}