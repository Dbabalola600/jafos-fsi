import connectMongo from "../../../../utils/connectMongo";
import Staff from "../../../../model/Staff/StaffModel";





export default async function SearchStaff(req, res) {
    if (req.method === "POST") {
        await connectMongo()

        const { find } = JSON.parse(req.body)
        const target = await Staff.find({ staffid: find })

        return res.status(200).json(...target)

    } else {
        return res.status(400).json({
            message: "WRONG REQUEST"
        })
    }


}