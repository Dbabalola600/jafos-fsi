import connectMongo from "../../../../utils/connectMongo";
import CheckOutItem from "../../../../model/Student/CheckOutItem";











export default async function fetchCheckout(req, res) {
    if (req.method === "POST") {
        console.log('CONNECTING TO MONGO');
        await connectMongo();
        console.log('CONNECTED TO MONGO');

        const { _id } = JSON.parse(req.body)

        console.log('FETCHING CHECKOUT');

        const orders = await CheckOutItem.find({ user: _id })
        console.log("FETCHED CHECKOUT")

        return res.status(200).json(
            orders
        )



    } else {

        return res.status(400).json({
            notFound: true,
        });

    }
}


