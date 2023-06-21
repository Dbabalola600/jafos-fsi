import connectMongo from "../../../../utils/connectMongo";



export default async function checker(req, res) {
    if (req.method === "POST") {

        await connectMongo();
        console.log("connected")
        return res.status(200).json("test")
    } else {
        return res.status(400).json({
            notFound: true,
        });
    }
}