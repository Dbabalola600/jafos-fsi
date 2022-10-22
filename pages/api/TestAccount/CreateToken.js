import connectMongo from "../../../utils/connectMongo";
import Token from "../../../model/TEST Account/Token";





export default async function createToken(req, res) {
    try {
        console.log('CONNECTING TO MONGO');
        await connectMongo();
        console.log('CONNECTED TO MONGO');


        const { amount } = req.body
        const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijlkmnopqrstuvwxyz0123456789"


        function generateToken(length) {
            let result = "";
            const charactersLength = characters.length;
            for (let i = 0; i < length; i++) {
                result += characters.charAt(Math.floor(Math.random() * charactersLength))
            }
            return result
        }


        console.log('CREATING DOCUMENT');

        const available_token = await Token.find({ token: generateToken(6) })

        

        const new_tok = await Token.create({
            token: generateToken(6),
            amount
        })

        console.log("CREATED TOKEN")
        res.json({ new_tok })
    } catch (error) {
        console.log(error);
        res.json({ error });
    }
}