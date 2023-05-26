import connectMongo from "../../../../utils/connectMongo";
import Cart from "../../../../model/Staff/Cart";
import Seller from "../../../../model/Seller/Seller";



export default async function newCart(req, res) {
    if (req.method === "POST") {
        console.log('CONNECTING TO MONGO');
        await connectMongo();
        console.log('CONNECTED TO MONGO');

        const { user, storename, title, category, price } = JSON.parse(req.body)


        const store = await Seller.find({ storename: storename })

        //check if store is open or nah


        if (store[0].status === "Closed") {
            res.status(201).json(store[0].status)
        } else {
            //add item to cart 

            const cartPro = await Cart.create({
                user,
                storename,
                title,
                category,
                price
            });

            console.log("Added to Cart");
            res.status(200).json({ cartPro })

        }




    } else {

        return res.status(400).json({
            notFound: true,
        });

    }

}
