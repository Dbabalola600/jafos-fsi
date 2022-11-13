import connectMongo from "../../../../utils/connectMongo";


import OrderItem from "../../../../model/Student/orderItem";

import Order from "../../../../model/Student/order";







export default async function updateOrderStat(req, res) {
    if (req.method === "POST") {

        console.log('CONNECTING TO MONGO');
        await connectMongo();
        console.log('CONNECTED TO MONGO');

        const { id } = JSON.parse(req.body)



        const updateItem = await OrderItem.findById(id).updateOne({status: "Completed"})
        
        console.log(updateItem)
        
        return res.status(200).json({ message: "Status Changed" })
        

       
  
  
        // return res.status(200).json("mess")


    } else {
        return res.status(400).json({
            message: "WRONG REQUEST"
        })
    }
}
























