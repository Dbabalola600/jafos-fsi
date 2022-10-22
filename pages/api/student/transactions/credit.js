import connectMongo from "../../../../utils/connectMongo";
import Token from "../../../../model/Creder/token";
import Student from "../../../../model/Student/StudentModel";
import AdminToken from "../../../../model/Admin/AdminToken"





export default async function TokenCredit(req,res){
    if(req.method === "POST"){
        console.log('CONNECTING TO MONGO');
        await connectMongo();
        console.log('CONNECTED TO MONGO');




        const {tok, id} = JSON.parse(req.body)

        const user = await Student.findById(id)


        const tok_val = await Token.find({token:tok})

        // console.log(tok_val)

        if(tok_val=== "") return res.status(408).json({message:"nope"})

        if (tok_val[0].status === "available") {
            //credit account with token 
            const new_bal = tok_val[0].amount + user.account_bal
            const bal = await Student.findById(id).updateOne({ account_bal: new_bal })

            //update token details 
            const tok_update = await Token.findById(tok_val[0]._id).updateOne({ status: "used", usedBy: user.matricno })

            return res.status(200).json({
                message: "transfer done",
            })

        } 


        if (tok_val[0].status === "Master") {
            //credit account with token 
            const new_bal = tok_val[0].amount + user.account_bal
            const bal = await Student.findById(id).updateOne({ account_bal: new_bal })

            //update token details 
            const tok_update = await Token.findById(tok_val[0]._id).updateOne({  usedBy: user.matricno })

            return res.status(200).json({
                message: "transfer done",
            })
        }
        else {
            return res.status(256).json({
                message: "nope",
            });
        }

       

        



    }else {

        return res.status(400).json({
            message: "wrong request",
        });

    }
}