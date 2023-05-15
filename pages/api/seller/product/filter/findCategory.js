import connectMongo from "../../../../../utils/connectMongo";
import Seller from "../../../../../model/Seller/Seller";
import Product from "../../../../../model/Seller/Products";







export default async function findCategories(req, res) {
    if (req.method === "POST") {
        await connectMongo()
        const { id } = JSON.parse(req.body)

        const user = await Seller.findById(id)


        const offer = await Product.find({ owner: user._id }).select("category")


        let cat_list = []

        for (let i = 0; i < offer.length; i++) {
            cat_list.push(offer[i].category)
        }



        const n_list = [... new Set(cat_list)]
        return res.json(n_list)


    } else {
        return res.status(400).json({
            message: "wrong request"
        })
    }
}