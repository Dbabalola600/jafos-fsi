import connectMongo from "../../../../utils/connectMongo";
import Cart from "../../../../model/Staff/Cart";








export default async function deleteFromCart(req, res) {
    if (req.method === "POST") {
        console.log('CONNECTING TO MONGO');
        await connectMongo();
        console.log('CONNECTED TO MONGO');

        const { id } = JSON.parse(req.body)
        console.log(id)
        const delOne = await Cart.findByIdAndDelete({ _id: id })

        // const del = await Cart.deleteOne(JSON.parse(id))
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