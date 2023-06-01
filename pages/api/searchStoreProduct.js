





import connectMongo from "../../utils/connectMongo";
import Product from "../../model/Seller/Products";
import Seller from "../../model/Seller/Seller"




export default async function SearchStoreProduct(req, res) {
    if (req.method === "POST") {

        console.log('CONNECTING TO MONGO');
        await connectMongo();
        console.log('CONNECTED TO MONGO');

        const { id, find } = JSON.parse(req.body)

        console.log('FETCHING DOCUMENTS');

       

        const target = await Product.find({owner: id}).find({ title: { $regex: find, $options: "i" } })
        if (target[0] === undefined) {
            const target = await Product.find({owner: id}).find({ category: { $regex: find, $options: "i" } })
         
                return res.status(200).json(

                    target,

                )
          

        } else {
            return res.status(200).json(

                target,

            )
        }



    } else {
        return res.status(400).json({
            message: "WRONG REQUEST",
        });
    }
}