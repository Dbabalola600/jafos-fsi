import connectMongo from "../../../../utils/connectMongo";
import Product from "../../../../model/Seller/Products";




export default async function fetchProduct(req, res) {
    if (req.method === "POST") {
        console.log('CONNECTING TO MONGO');
        await connectMongo();
        console.log('CONNECTED TO MONGO');



        const { _id } = JSON.parse(req.body)

        const proi = await Product.findById(_id)

        console.log(_id)


        return res.status(200).json(
          proi
        )


    } else {

        return res.status(400).json({
            message: "wrong request",
        });

    }


}



