import connectMongo from '../../../utils/connectMongo';

import Seller from '../../../model/Seller/Seller';








export default async function ClosedStat(req, res) {
    try {
        console.log('CONNECTING TO MONGO');
        await connectMongo();
        console.log('CONNECTED TO MONGO');


        const { id } = JSON.parse(req.body)


        const UpdateStat = await Seller.findById(id).updateOne({ status: "Closed" })
        console.log(UpdateStat)
        return res.status(200).json({ message: "Status Changed" })



    } catch (error) {

        console.log(error);
        res.json({ error });
    }
}