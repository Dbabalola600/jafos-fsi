import connectMongo from "../../../../utils/connectMongo";
import AdminToken from "../../../../model/Admin/AdminToken";
import Admin from "../../../../model/Admin/AdminModel";




export default async function CreateAdminToken(req,res){
    if (req.method === "POST") {

        console.log('CONNECTING TO MONGO');
        await connectMongo();
        console.log('CONNECTED TO MONGO');


        const { amount, credid } = JSON.parse(req.body)


        const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijlkmnopqrstuvwxyz0123456789"
        function generateToken(length) {
            let result = "";
            const charactersLength = characters.length;
            for (let i = 0; i < length; i++) {
                result += characters.charAt(Math.floor(Math.random() * charactersLength))
            }
            return result
        }


        console.log('CREATING TOKEN');

        
        const cred_det = await Admin.findById(credid)



        const new_tok = await AdminToken.create({
            token: generateToken(6),
            amount,
            madeBy: cred_det.AdminId
        })

        console.log("CREATED TOKEN")
        res.json({ new_tok })

    } else {

        return res.status(400).json({
            message: "wrong request",
        });

    }
}



