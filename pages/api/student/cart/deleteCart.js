import connectMongo from "../../../../utils/connectMongo";

import Cart from "../../../../model/Cart";




/**
 * @param {import('next').NextApiRequest} req
 * @param {import('next').NextApiResponse} res
 */



export default async function deleteCart(req, res) {
    if (req.method === 'POST') {
        console.log('CONNECTING TO MONGO');
        await connectMongo();
        console.log('CONNECTED TO MONGO');

        const { user } = JSON.parse(req.body)
        const del = await Cart.deleteMany(user)

        console.log("Deleted Cart")

        return res.status(200).json(
            del
        )


    } else {
        return res.status(400).json({
            notFound: true,
        });
    }

}










