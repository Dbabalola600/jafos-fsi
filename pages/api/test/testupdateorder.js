import connectMongo from '../../../utils/connectMongo';
import TestOrder from '../../../model/TestOrder';

/**
 * @param {import('next').NextApiRequest} req
 * @param {import('next').NextApiResponse} res
 */
export default async function TestDeleteOrder(req, res) {
  try {
    console.log('CONNECTING TO MONGO');
    await connectMongo();
    console.log('CONNECTED TO MONGO');

   
const updateorder = await TestOrder.findByIdAndUpdate(req.body)

    console.log('updated order');


    res.json({  updateorder });
  } catch (error) {
    console.log(error);
    res.json({ error });
  }
}