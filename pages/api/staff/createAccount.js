import connectMongo from "../../../utils/connectMongo";

import Staff from "../../../model/Staff/StaffModel";








export default async function addStaff(req, res) {
    try {
        console.log('CONNECTING TO MONGO');
        await connectMongo();
        console.log('CONNECTED TO MONGO');

        console.log('CREATING DOCUMENT');

        const { firstname, lastname, staffid, password } = req.body
        const staff = await Staff.create({
            firstname,
            lastname,
            staffid,
            password
        })

        console.log("CREATED STAFF")

        res.json({staff})


    } catch (error) {
        console.log(error);
        res.json({ error });
    }
}