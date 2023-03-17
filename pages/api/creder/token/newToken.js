import connectMongo from "../../../../utils/connectMongo";
import Token from "../../../../model/Creder/token";
import Creder from "../../../../model/Creder/Creder";



export default async function createToken(req, res) {
    if (req.method === "POST") {

        console.log('CONNECTING TO MONGO');
        await connectMongo();
        console.log('CONNECTED TO MONGO');


        const { amount, credid, pin } = JSON.parse(req.body)


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

        const cred_det = await Creder.findById(credid)

        if (pin === cred_det.pin) {
            const new_tok = await Token.create({
                token: generateToken(6),
                amount,
                madeBy: cred_det.creder_no
            })

            console.log("CREATED TOKEN")
            res.json({ new_tok })
        } else {
            return res.status(245).json({
                message: "incorrect pin"
            })
        }



        } else {

            return res.status(400).json({
                message: "wrong request",
            });

        }
    }

