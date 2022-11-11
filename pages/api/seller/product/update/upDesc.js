import connectMongo from "../../../../../utils/connectMongo";
import Product from "../../../../../model/Seller/Products";









export default async function upDesc(req, res) {
    if (req.method == "POST") {



        const { _id, title, price, category, description } = JSON.parse(req.body)




        console.log('CONNECTING TO MONGO');
        await connectMongo();
        console.log('CONNECTED TO MONGO');



        if (description === "") {
            return res.status(200).json({
                message: "BLANK UPDATED"
            })
        } else {
            const new_desc = await Product.findById(_id).updateOne({ description: description })
           
        }
        return res.status(200).json({
            message: "DESCRIPTION UPDATED"
        })


    } else {
        return res.status(401).json({
            message: "WRONG REQUEST"
        })
    }
}
