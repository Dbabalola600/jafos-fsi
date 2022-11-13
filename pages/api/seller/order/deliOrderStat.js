import connectMongo from "../../../../utils/connectMongo";


import OrderItem from "../../../../model/Student/orderItem";


export default async function updateOrderStat(req, res) {
    if (req.method === "POST") {


        console.log('CONNECTING TO MONGO');
        await connectMongo();
        console.log('CONNECTED TO MONGO');


        const { id } = JSON.parse(req.body)



        const updateItem = await OrderItem.findById(id).updateOne({ status: "Delivered" })
        const paidItem = await OrderItem.findById(id).updateOne({ p_status: "Paid" })
        console.log(updateItem)

        return res.status(200).json({ message: "Status Changed" })


    } else {
        return res.status(400).json({
            message: "WRONG REQUEST"
        })
    }
}





