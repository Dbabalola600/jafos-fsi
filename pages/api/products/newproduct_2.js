import connectMongo from '../../../utils/connectMongo';

import Product_Seller2 from '../../../model/Products/Products_Seller2';
/**
 * @param {import('next').NextApiRequest} req
 * @param {import('next').NextApiResponse} res
 */
export default async function addProduct(req, res) {
  try {
    console.log('CONNECTING TO MONGO');
    await connectMongo();
    console.log('CONNECTED TO MONGO');
    
    console.log('CREATING DOCUMENT');
    const {title, category, price, description} = JSON.parse(req.body)
    
    const product = await Product_Seller2.create({
    title, 
    category,
    price,
    description 
    });
    console.log('CREATED PRODUCT');

    res.json({ product });
  } catch (error) {
    console.log(error);
    res.json({ error });
  }
}