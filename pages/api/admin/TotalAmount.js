import connectMongo from "../../../utils/connectMongo";
import Creder from "../../../model/Creder/Creder";








export default async function TotalCash(req,res){
    try{

        await connectMongo();

        const creders = await Creder.find()


        let total =0

        for(let i =0; i< creders.length; i++){
            total = total+ creders[i].account_bal
        }
        return res.status(200).json(total)

    }catch(error){

        console.log(error);
        res.json({ error });
    }
}