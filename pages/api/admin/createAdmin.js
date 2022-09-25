import connectMongo from "../../../utils/connectMongo"
import Admin from "../../../model/Admin/AdminModel"



/**
 * @param {import('next').NextApiRequest} req
 * @param {import('next').NextApiResponse} res
 */


export default async function newAdmin(req, res) {
    try {
        console.log("CONNECTING TO MONGO")
        await connectMongo();
        console.log("CONNECTED TO MONGO")
        console.log("CREATING ADMIN")



        const admin = await Admin.create(req.body)


        console.log("created admin")


        res.json({ admin })
    } catch (error) {
        console.log(error)
        res.json({ error })
    }

}



