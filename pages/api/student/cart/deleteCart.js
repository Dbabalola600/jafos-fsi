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

        console.log(user)
        const del = await Cart.find({ user: user })

        console.log("Deleted Cart")


        // console.log(del[0]._id)


        let massId = []
        for (let i = 0; i < del.length; i++) {
            massId.push(del[i]._id)
        }

        const delAll = await Promise.all((
            massId.map(async (id) => {
                await Cart.findByIdAndDelete({ _id: id })
            })

        ))


        return res.status(200).json(
            delAll
        )


    } else {
        return res.status(400).json({
            notFound: true,
        });
    }

}










