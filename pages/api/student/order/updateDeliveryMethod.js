import connectMongo from "../../../../utils/connectMongo";
import CheckOutItem from "../../../../model/Student/CheckOutItem";





export default async function updateDeliveryMethod(req, res) {
    try {
        console.log('CONNECTING TO MONGO');
        await connectMongo();
        console.log('CONNECTED TO MONGO');


        const { massId, methUp } = JSON.parse(req.body)

        const update = await Promise.all((
            massId.map(async (id) => {
                 await CheckOutItem.findById(id).updateOne({ mod: methUp })
            })
        ))


        return res.status(200).json({message: "GOOD FREAKING JOB"})



    } catch (error) {

        console.log(error);
        res.json({ error });
    }
}