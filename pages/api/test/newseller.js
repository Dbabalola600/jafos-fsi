import connectMongo from '../../../utils/connectMongo';

import Seller from '../../../model/Seller';

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
    const {firstname, lastname, storename, password} = JSON.parse(req.body)
    
    const seller = await Seller.create({
      firstname,
      lastname,
      storename,
      password, 
      
    });
    console.log('CREATED SELLER');

    res.json({ seller });
  } catch (error) {
    console.log(error);
    res.json({ error });
  }
}