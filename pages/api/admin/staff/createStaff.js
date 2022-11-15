import connectMongo from "../../../../utils/connectMongo";
import Staff from "../../../../model/Staff/StaffModel";






export default async function addStaff(req, res) {
    if (req.method === "POST") {
        console.log('CONNECTING TO MONGO');
        await connectMongo();
        console.log('CONNECTED TO MONGO');

        console.log('CREATING DOCUMENT');

        const { firstname, lastname, staffid, password } =JSON.parse( req.body)
        const staff = await Staff.create({
            firstname: firstname,
            lastname: lastname,
            staffid: staffid,
            password: password
        })

        console.log("CREATED STAFF")

        res.json({ staff })


    } else {
        return res.status(400).json({
            message: "wrong request "
        })
    }
}




