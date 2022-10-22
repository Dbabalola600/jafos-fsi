import connectMongo from "../../../utils/connectMongo";
import Creder from "../../../model/Creder/creder";





export default async function fetchCreder(req, res) {

    if (req.method === "POST") {
      console.log('CONNECTING TO MONGO');
      await connectMongo();
      console.log('CONNECTED TO MONGO');
  
      const { _id } = JSON.parse(req.body)
  
      console.log('FETCHING DOCUMENTS');
  
  
      // const token = getCookies( { req, res, path:'/', domain:'localhost' })
      // console.log(token)
  
      const creder = await Creder.findById(_id);
  
      console.log('FETCHED Creder');
      console.log(creder)
      return res.status(200).json({
          ...creder._doc,
  
      })
  }
  else {
  
      return res.status(400).json({
          notFound: true,
      });
  
  }
  
  
  
  
  };