import connectMongo from '../../../utils/connectMongo';
import Test from '../../../model/testModel';
import Seller from '../../../model/Seller'
import Student from '../../../model/StudentModel';

//export const getServerSideprops = async () =>
//export default async function fetchtest(getServerSideprops)

export default async function fetchtest(req,res) {
  try {
    console.log('CONNECTING TO MONGO');
    await connectMongo();
    console.log('CONNECTED TO MONGO');

    console.log('FETCHING DOCUMENTS');
    // const tests = await Test.findById({_id: req.body._id});

    const tests = await Seller.find()
    
    console.log('FETCHED DOCUMENTS');

    res.status(200).json({
        tests,
      })

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