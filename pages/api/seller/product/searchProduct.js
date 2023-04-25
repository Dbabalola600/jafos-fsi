import connectMongo from "../../../../utils/connectMongo"

import Product from "../.././../../model/Seller/Products"


export default async function SearchProduct(req, res) {
    if (req.method === "POST") {

        await connectMongo()


        const { id, find } = JSON.parse(req.body)
        const target = await Product.find({ owner: id, title: { $regex: find, $options: "i" } })
        if (target[0] === undefined) {
            const target = await Product.find({ owner: id, category: { $regex: find, $options: "i" } })
            if (target[0] === undefined) {
                return res.json(
                    [{
                        title: "null",
                        price: "null",
                        category: "null",
                        description: "null",
                        _id: "0"
                    }]
                )
            } else {
                return res.status(200).json(target)
            }
        } else {
            return res.status(200).json(target)
        }


    } else {
        return res.status(400).json({
            message: "wrong request"
        })
    }
}