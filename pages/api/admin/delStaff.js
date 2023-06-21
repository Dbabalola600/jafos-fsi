import connectMongo from "../../../utils/connectMongo";
import Staff from "../../../model/Staff/StaffModel";




export default async function deleteStaff(req, res) {
    if (req.mehtod === "POST") {
        await connectMongo();
        return res.status(200).json("done")

    } else {

        return res.status(400).json({
            notFound: true,
        });
    }
}
