import connectMongo from '../../../utils/connectMongo';
import Test from '../../../model/testModel';
import TestOrder from '../../../model/TestOrder'

//import mongoose from 'mongoose';

const mongoose = require("mongoose")


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
  
    const newOrderStruct = await Promise.all(orders.map( async(oriOrder) => {
        const existingUser = await Test.findById(oriOrder.user);
        console.log(existingUser)
        if (!existingUser) {
            return { ...oriOrder, userObj: null };
        }
        return ({
            ...oriOrder,
            userObj: existingUser
        });

    }) )
    
    console.log('FETCHED ORDERS');

    console.log(newOrderStruct)

    res.status(200).json({
       orders: newOrderStruct
      })

    return 

  } catch (error) {
    console.log(error);
    return res.status(400).json( {
      notFound: true,
    });
  }
};