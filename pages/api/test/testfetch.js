import connectMongo from '../../../utils/connectMongo';

import Seller from '../../../model/Seller/Seller';
import OrderItem from '../../../model/Student/orderItem';

//export const getServerSideprops = async () =>
//export default async function fetchtest(getServerSideprops)

export default async function fetchtest(req,res) {
  try {
    console.log('CONNECTING TO MONGO');
        await connectMongo();
        console.log('CONNECTED TO MONGO');

        console.log('FETCHING Sellers');
        // const tests = await Test.findById({_id: req.body._id});

        const sellers = await Seller.find().sort({createdAt: 1})
// const order = await OrderItem.find()
        console.log('FETCHED Sellers');


        // console.log(sellers[0].createdAt)
        res.status(200).json(sellers)

        return

   

  } catch (error) {
    console.log(error);
    return res.status(400).json( {
      notFound: true,
    });
  }
};



// export default  async function testfetch  ()  {
//   try {
//     console.log('CONNECTING TO MONGO');
//     await connectMongo();
//     console.log('CONNECTED TO MONGO');

//     console.log('FETCHING DOCUMENTS');
//     const tests = await Test.find();
//     console.log('FETCHED DOCUMENTS');

//     return {
//       props: {
//         tests: JSON.parse(JSON.stringify(tests)),
//       },
//     };
//   } catch (error) {
//     console.log(error);
//     return {
//       notFound: true,
//     };
//   }
// };