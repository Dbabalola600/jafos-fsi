import connectMongo from '../../utils/connectMongo';
import StudentModel from '../../model/StudentModel';




/**
 * @param {import('next').NextApiRequest} req
 * @param {import('next').NextApiResponse} res
 */



export default async function Login(req, res) {
    try {
        console.log('CONNECTING TO MONGO');
        await connectMongo();
        console.log('CONNECTED TO MONGO');


        var matricno = req.body.matricno
        var password = req.body.password

        const login = await StudentModel.find(req.body)

        if (login == null|[] ) {
            console.log("not login")
            res.json(error)
        }
        else res.json({login})
        console.log("login good")






    } catch (error) {


        console.log(error);
        res.json({ error });
    }
}