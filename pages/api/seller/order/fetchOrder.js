import connectMongo from "../../../../utils/connectMongo";
import OrderItem from "../../../../model/Student/orderItem";
import Student from "../../../../model/StudentModel"

/**
 * @param {import('next').NextApiRequest} req
 * @param {import('next').NextApiResponse} res
 */






export default async function fetchOrder(req, res) {
    if (req.method === "POST") {
        console.log('CONNECTING TO MONGO');
        await connectMongo();
        console.log('CONNECTED TO MONGO');

        const { name } = JSON.parse(req.body)
        console.log("FETCHING DOCUMENTS")


        const orders = await OrderItem.find({ storename: name }).sort({createdAt: -1})


        const newOrderStuct = await Promise.all(orders.map(async (oriOrder) => {
            const existingUser = await Student.findById(oriOrder.user).select("firstname ")
            // console.log(existingUser)

            // console.log(existingUser)
            if (!existingUser) {
                return { ...oriOrder, userObj: null };
            }
            return ({
                ...oriOrder,
                userObj: existingUser
            });


        }))



        // console.log(newOrderStuct)
        return res.json(

             newOrderStuct
        )



    } else {
        return res.status(400).json({
            notFound: true,
        });
    }
}
