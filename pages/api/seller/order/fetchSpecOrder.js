import connectMongo from "../../../../utils/connectMongo";
import Order from "../../../../model/Student/order";




export default async function fetchSpecOrder(req, res) {
    if (req.method === "POST") {

        console.log('CONNECTING TO MONGO');
        await connectMongo();
        console.log('CONNECTED TO MONGO');



        const { Sname } = JSON.parse(req.body)

        // const ord = await Order.find()

        console.log(Sname)

        const sepc = await Order.find({ stores: Sname })
        console.log(sepc)

        let num = []

        for (let i = 0; i < sepc.length; i++) {

            num.push(i)
            // setorderNum(i)
        }

        // console.log(num)


        let massTh = await Order.find({ stores: Sname })
        for (let i = 0; i < sepc.length; i++) {
            // massTh.push(num)


            let orderNum = i
            massTh.push(sepc[i], { "orderNum": orderNum })
            // setorderNum(i)
        }

        console.log(sepc.index)

        return res.status(200).json(

            sepc
        )

    } else {
        return res.status(401).json({
            message: "wrong request"
        })
    }
}












