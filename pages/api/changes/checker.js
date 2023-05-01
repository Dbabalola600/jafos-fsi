import connectMongo from "../../../utils/connectMongo";
import Student from "../../../model/Student/StudentModel";






export default async function Checker(req, res) {
    if (req.method === "POST") {


        connectMongo("open", async () => {




            const { na } = JSON.parse(req.body)

            // console.log(na)


            let changeStream;
            const person = await Student.findById(na)



            changeStream = person.watch()
            // for await (const change of changeStream) {
            //     console.log("Recieved change:\n", change)
            // }

            // await changeStream.close();


            changeStream.on("change", (change) =>
                console.log(change)

            )


            return res.json(person)
        });







        // return res.json(person)


    } else {
        return res.status(400).json({
            notFound: true,
        });
    }
}