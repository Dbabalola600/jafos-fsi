import connectMongo from "../../../../utils/connectMongo";

import OrderItem from "../../../../model/Student/orderItem";


export default async function updateOrderStat(req, res) {
    try {



        console.log('CONNECTING TO MONGO');
        await connectMongo();
        console.log('CONNECTED TO MONGO');


        const { id } = JSON.parse(req.body)

        const updateItem = await OrderItem.findById(id).updateOne({status: "Canceled"})

        console.log(updateItem)

        return res.status(200).json({ message: "Status Changed" })


    } catch (error) {

        console.log(error);
        res.json({ error });
    }
}





