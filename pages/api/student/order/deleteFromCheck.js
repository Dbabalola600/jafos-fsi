import connectMongo from "../../../../utils/connectMongo";
import CheckOutItem from "../../../../model/Student/CheckOutItem";



export default async function deleteCheck(req,res){
    if(req.method === "POST"){
        console.log('CONNECTING TO MONGO');
        await connectMongo();
        console.log('CONNECTED TO MONGO');

        const { _id } = JSON.parse(req.body)
        const del = await CheckOutItem.deleteOne(_id)

        console.log("Deleted item")

        return res.status(200).json(
            del
        )



    } else {
        return res.status(400).json({
            message: "wrong request",
        });
    }
}