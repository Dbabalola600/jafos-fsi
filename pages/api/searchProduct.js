import connectMongo from "../../utils/connectMongo";
import Product from "../../model/Seller/Products";





export default async function SearchProduct(req, res) {
    if (req.method === "POST") {

        console.log('CONNECTING TO MONGO');
        await connectMongo();
        console.log('CONNECTED TO MONGO');

        const { find } = JSON.parse(req.body)

        console.log('FETCHING DOCUMENTS');



        const target = await Product.find({ title: { $regex: find, $options: "i" } })
        if (target[0] === undefined) {
            const target = await Product.find({ category: { $regex: find, $options: "i" } })
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
            }else{
                return res.status(200).json(
             
                    target,
                 
                )
            }

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