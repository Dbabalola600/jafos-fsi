import connectMongo from "../../../../utils/connectMongo";
import Staff from "../../../../model/Staff/StaffModel";

export default async function yeeter(req, res) {
    if (req.method === "POST") {
        await connectMongo()

        const {user} = JSON.parse(req.body)

        const delOne = await Staff.deleteOne({_id: user})

        return res.status(200).json(delOne)
    } else {
        return res.status(400).json({
            notFound: true
        })
    }
}