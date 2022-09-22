import connectMongo from "../../../../utils/connectMongo";
import Order from "../../../../model/Student/order";


/**
 * @param {import('next').NextApiRequest} req
 * @param {import('next').NextApiResponse} res
 */





export default async function newOrder (req, res){

    if (req.method === "POST"){
        console.log('CONNECTING TO MONGO');
        await connectMongo();
        console.log('CONNECTED TO MONGO');



        const {user, orderList } = JSON.parse(req.body)


        const order = await Order.create({
            user,
            orderList
        });


        console.log("ORDER ADDED")

        res.json({order})


        
    }else {

        return res.status(400).json({
            notFound: true,
        });

    }
}

