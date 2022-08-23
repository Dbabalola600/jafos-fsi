import connectMongo from '../../../utils/connectMongo';
import Test from '../../../model/testModel';

/**
 * @param {import('next').NextApiRequest} req
 * @param {import('next').NextApiResponse} res
 */
export default async function TestUpdate(req, res) {
    try {
        console.log('CONNECTING TO MONGO');
        await connectMongo();
        console.log('CONNECTED TO MONGO');

        console.log('CREATING DOCUMENT');
        const { name, email,_id } = JSON.parse(req.body)
        const delep = await Test.findByIdAndUpdate({
           _id: req.body._id,
            name,
            email
        })

        console.log('UPDATED DOCUMENT');

        res.json({ delep })
    } catch (error) {
        console.log(error);
        res.json({ error });
    }
}