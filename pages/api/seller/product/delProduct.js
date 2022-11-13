import connectMongo from "../../../../utils/connectMongo";
import Product from "../../../../model/Seller/Products";



export default async function delProduct(req, res) {
    if (req.method === "POST") {
        console.log('CONNECTING TO MONGO');
        await connectMongo();
        console.log('CONNECTED TO MONGO');

        const { id } = JSON.parse(req.body)



        // const del = await Product.deleteOne(_id)

        const del = await Product.findOneAndDelete({ _id: id })

        // const fer = await Product.findById(_id).deleteOne()

        console.log("deleted item")
        return res.status(200).json(
            del
        )


    } else {
        return res.status(400).json({
            message: "wrong request",
        });
    }



}


