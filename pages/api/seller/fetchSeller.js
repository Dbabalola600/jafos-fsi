import connectMongo from '../../../utils/connectMongo';
import Test from '../../../model/testModel';
import Seller from '../../../model/Seller/Seller'
import Student from '../../../model/StudentModel';

//export const getServerSideprops = async () =>
//export default async function fetchtest(getServerSideprops)

export default async function fetchSeller(req, res) {

  if (req.method === "POST") {
    console.log('CONNECTING TO MONGO');
    await connectMongo();
    console.log('CONNECTED TO MONGO');

    const { _id } = JSON.parse(req.body)

    console.log('FETCHING DOCUMENTS');


    // const token = getCookies( { req, res, path:'/', domain:'localhost' })
    // console.log(token)

    const seller = await Seller.findById(_id).select("storename firstname ");

    console.log('FETCHED SELLER');
    // console.log(student)
    return res.status(200).json({
        ...seller._doc,

    })
}
else {

    return res.status(400).json({
        notFound: true,
    });

}




};


