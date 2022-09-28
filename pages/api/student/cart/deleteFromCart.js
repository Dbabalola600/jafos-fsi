import connectMongo from "../../../../utils/connectMongo";

import Cart from "../../../../model/Cart";



/**
 * @param {import('next').NextApiRequest} req
 * @param {import('next').NextApiResponse} res
 */




export default async function deleteFromCart(req, res) {
    if (req.method == "POST") {
        console.log('CONNECTING TO MONGO');
        await connectMongo();
        console.log('CONNECTED TO MONGO');

        const { _id } = JSON.parse(req.body)
        const delOne = await Cart.deleteOne( _id )
        console.log("DELETED ITEM")

        return res.status(200).json(
            delOne
        )




    } else {
        return res.status(400).json({
            notFound: true,
        });
    }

}