import connectMongo from "../../../utils/connectMongo";
import Creder from "../../../model/Creder/Creder";






export default async function addCreder(req, res) {
    try {
        console.log('CONNECTING TO MONGO');
        await connectMongo();
        console.log('CONNECTED TO MONGO');

        console.log('CREATING DOCUMENT');

        const {
            firstname,
            lastname,
            creder_no,
            password
        } = req.body

        const creder = await Creder.create({
            firstname,
            lastname,
            creder_no,
            password
        })
        console.log('CREATED ACCOUNT');

        res.json({ creder });

    } catch (error) {
        console.log(error);
        res.json({ error });
    }
}