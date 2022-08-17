import connectMongo from '../../../utils/connectMongo';

import TestSeller from '../../../model/TestSeller';
import TestProduct from '../../../model/TestProducts';

/**
 * @param {import('next').NextApiRequest} req
 * @param {import('next').NextApiResponse} res
 */
export default async function addSeller(req, res) {
  try {
    console.log('CONNECTING TO MONGO');
    await connectMongo();
    console.log('CONNECTED TO MONGO');
    
    console.log('CREATING DOCUMENT');
    
    const testseller = await TestSeller.create(
    req.body
        );

    const testproduct = await TestProduct.create(
        req.body
    );
       
    console.log('CREATED TestSELLER');

    res.json({ testseller, testproduct });
  } catch (error) {
    console.log(error);
    res.json({ error });
  }
}