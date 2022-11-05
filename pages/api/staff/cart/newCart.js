import connectMongo from "../../../../utils/connectMongo";
import Cart from "../../../../model/Staff/Cart";




export default async function newCart(req, res) {
    if (req.method === "POST") {
        console.log('CONNECTING TO MONGO');
        await connectMongo();
        console.log('CONNECTED TO MONGO');

        const { user, storename, title, category, price } = JSON.parse(req.body)

        const cartPro = await Cart.create({
            
            user,
            storename,
            title,
            category,
            price
        });

        console.log("Added to Cart");
        res.json({ cartPro })


    } else {

        return res.status(400).json({
            notFound: true,
        });

    }

}
