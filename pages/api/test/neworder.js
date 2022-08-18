import connectMongo from '../../../utils/connectMongo';
import TestOrder from '../../../model/TestOrder';

/**
 * @param {import('next').NextApiRequest} req
 * @param {import('next').NextApiResponse} res
 */
export default async function addTestOrder(req, res) {
  try {
    console.log('CONNECTING TO MONGO');
    await connectMongo();
    console.log('CONNECTED TO MONGO');

    console.log('CREATING DOCUMENT');
    const testorder = await TestOrder.create(req.body);
    console.log('CREATED DOCUMENT');

    res.json({ testorder });
  } catch (error) {
    console.log(error);
    res.json({ error });
  }
}