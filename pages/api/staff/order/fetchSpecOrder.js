import connectMongo from "../../../../utils/connectMongo";
import Order from "../../../../model/Staff/order";





export default async function fetchSpecOrder(req, res) {
    if (req.method === "POST") {

        console.log('CONNECTING TO MONGO');
        await connectMongo();
        console.log('CONNECTED TO MONGO');



        const { stu } = JSON.parse(req.body)

        // const ord = await Order.find()

        console.log(stu)

        const sepc = await Order.find({ user: stu }).sort({ createdAt: -1 })
        console.log(sepc)

        let num = []







        return res.status(200).json(

            sepc
        )

    } else {
        return res.status(401).json({
            message: "wrong request"
        })
    }
}


