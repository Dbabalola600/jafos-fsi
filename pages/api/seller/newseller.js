import connectMongo from '../../../utils/connectMongo';

import Seller from '../../../model/Seller/Seller';

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
    
    const seller = await Seller.create(
    req.body
      
    );
    console.log('CREATED SELLER');

    res.json({ seller });
  } catch (error) {
    console.log(error);
    res.json({ error });
  }
}