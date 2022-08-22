import connectMongo from '../../utils/connectMongo';
import StudentModel from '../../model/StudentModel';
import { error } from 'console';




/**
 * @param {import('next').NextApiRequest} req
 * @param {import('next').NextApiResponse} res
 */
export default async function Login(req, res) {
    try {
        console.log('CONNECTING TO MONGO');
        await connectMongo();
        console.log('CONNECTED TO MONGO');

        const { matricno, password } = JSON.parse(req.body)
        
        const login = await StudentModel.find(
            {
                matricno,
                password
            }
        );

        res.json({ login })


        console.log("SIGN IN SUCESSFUL")


    } catch (error) {

        console.log(error);
        res.json({ error });
    }
}




// if (login == null|[] ) {
//     console.log("not login")
//     res.json(error)
// }
// else res.json({login})
// console.log("login good")
