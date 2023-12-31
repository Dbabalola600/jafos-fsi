import connectMongo from "../../../utils/connectMongo";
import Seller from '../../../model/Seller/Seller'





export default async function fetchSeller(req, res) {

  if (req.method === "POST") {
    console.log('CONNECTING TO MONGO');
    await connectMongo();
    console.log('CONNECTED TO MONGO');

    const { _id } = JSON.parse(req.body)

    console.log('FETCHING DOCUMENTS');


    // const token = getCookies( { req, res, path:'/', domain:'localhost' })
    // console.log(token)

    const sell = await Seller.findById(_id);

    console.log('FETCHED SELLER');
    //   console.log(seller)
    return res.status(200).json(
      sell

    )
  }
  else {

    return res.status(400).json({
      notFound: true,
    });

  }




};

