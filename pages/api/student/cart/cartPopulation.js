import connectMongo from "../../../../utils/connectMongo";
import Cart from "../../../../model/Cart";



export default async function CartPopulation (req,res){
    if (req.method === "POST") {
        console.log('CONNECTING TO MONGO');
        await connectMongo();
        console.log('CONNECTED TO MONGO');
        const { id } = JSON.parse(req.body)

        console.log('FETCHING DOCUMENTS');
        const CartItems = await Cart.find({ user: id }).select("title category price storename  ")
        console.log(CartItems.length)

        let tot = CartItems.length

        console.log("ITEMS GOTTEN")
        return res.json(tot)


    }else{
        return  res.status(400).json({
            notFound: true,
        });

    }
}