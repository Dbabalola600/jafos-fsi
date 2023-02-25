import connectMongo from "../../../../utils/connectMongo";
import CheckOutItem from "../../../../model/Staff/CheckOutItem";





export default async function updateDeliveryPickup(req, res) {
    if (req.method === "POST") {
        console.log('CONNECTING TO MONGO');
        await connectMongo();
        console.log('CONNECTED TO MONGO');


        const { massId } = JSON.parse(req.body)


        for (let i = 0; i < massId.length; i++) {

            const update = await Promise.all((
                massId.map(async (id) => {
                    await CheckOutItem.findById(id).updateOne({ mod: "PickUp" })
                })
            ))



        }


        return res.status(200).json({ message: "GOOD FREAKING JOB" })



    } else {

        return res.status(400).json({
            message: "wrong request"
        })
    }
}