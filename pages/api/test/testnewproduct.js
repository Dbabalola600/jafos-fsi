import connectMongo from '../../../utils/connectMongo';

import TestProduct from '../../../model/TestProducts';
import TestSeller from '../../../model/TestSeller';
/**
 * @param {import('next').NextApiRequest} req
 * @param {import('next').NextApiResponse} res
 */
export default async function addTestProduct(req, res) {
  try {
    console.log('CONNECTING TO MONGO');
    await connectMongo();
    console.log('CONNECTED TO MONGO');
    
    console.log('CREATING DOCUMENT');
   
    const testproduct = await TestProduct.findOne({TestSeller: storename}).create(req.body);
    console.log('CREATED PRODUCT with ');

    res.json({ testproduct, testseller });
  } catch (error) {
    console.log(error);
    res.json({ error });
  }
}