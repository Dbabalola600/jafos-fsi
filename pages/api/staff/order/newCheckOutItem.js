import connectMongo from "../../../../utils/connectMongo";
import CheckOutItem from "../../../../model/Staff/CheckOutItem";







export default async function newCheckOutItem(req, res) {
    if (req.method === "POST") {
        console.log('CONNECTING TO MONGO');
        await connectMongo();
        console.log('CONNECTED TO MONGO');






        const { user, cartList } = JSON.parse(req.body)

        const item = await Promise.all((
            cartList.map(async (cart) => {
                return await CheckOutItem.create({
                    product: cart.product,
                    user: user,
                    storename: cart.storename,
                    price: cart.price,
                    quantity: cart.quantity,
                    amount: cart.amount,
                    status: "Pending",
                    p_status: "Pay on Delivery",
                    mod: "PickUp"
                })
            })))

        console.log([...item]);

        console.log("ORDER ITEM ADDED ")


        res.status(200).json({
            message:"YOU DID IT!!!!"
        })



    } else {

        return res.status(400).json({
            message: "wrong request",
        });

    }
}
