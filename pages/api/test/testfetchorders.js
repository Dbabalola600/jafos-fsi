import connectMongo from '../../../utils/connectMongo';
import Test from '../../../model/testModel';
import TestOrder from '../../../model/TestOrder'


//export const getServerSideprops = async () =>
//export default async function fetchtest(getServerSideprops)

export default async function testfetchorder(req,res) {
  try {
    console.log('CONNECTING TO MONGO');
    await connectMongo();
    console.log('CONNECTED TO MONGO');

    console.log('FETCHING DOCUMENTS');
    
   // const orders = await TestOrder.find().populate("test");
    // const orders = await TestOrder.find()

    const orders =(await TestOrder.find())
   
    const newOrderStruct =  orders.map( async(oriOrder) => {
        const existingUser = await Test.findOne({ _id: oriOrder.user });
        console.log(existingUser);
        // if (!existingUser) {
        //     return { ...oriOrder, user: null };
        // }
        return {
            ...oriOrder,
            user: existingUser
        };

    }) 
    console.log(newOrderStruct)
    console.log('FETCHED ORDERS');

    

    res.status(200).json({
       orders,   
      
      })

    return 

  } catch (error) {
    console.log(error);
    return res.status(400).json( {
      notFound: true,
    });
  }
};