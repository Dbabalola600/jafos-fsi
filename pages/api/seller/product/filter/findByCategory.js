import connectMongo from "../../../../../utils/connectMongo";
import Product from "../../../../../model/Seller/Products";





export default async function SearchCategory(req, res) {

    if (req.method === "POST") {
        await connectMongo();

        const { id, find } = JSON.parse(req.body)
        const target = await Product.find({ owner: id, category: { $regex: find, $options: "i" } })



        return res.status(200).json(target)
    } else {
        return res.status(400).json({
            message: "wrong request"
        })
    }


}

